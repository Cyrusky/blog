import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { type FC, useRef, useState } from "react";
import type { LeetCodeQuestion } from "@boris/common";
import { LeetcodeAPI } from "@/api/leetcode.ts";
import { Button, message, Space, Tag, Typography } from "antd";
import { Difficulty } from "@boris/common/src/types/model/LeetCodeQuestion.ts";
import {
  LockOutlined,
  RedoOutlined,
  TranslationOutlined,
  UnlockOutlined,
} from "@ant-design/icons";

const { Link, Text } = Typography;
type SortOrder = "descend" | "ascend" | null;
export const LeetCodeForm: FC = () => {
  const [loading, setLoading] = useState(false);
  const actionRef = useRef<ActionType>();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const getDifficulty = (difficulty: Difficulty) => {
    switch (difficulty) {
      case Difficulty.Easy:
        return (
          <Tag color={"green"} bordered={false}>
            ★⚝⚝
          </Tag>
        );
      case Difficulty.Medium:
        return (
          <Tag color={"blue"} bordered={false}>
            ★★⚝
          </Tag>
        );
      case Difficulty.Hard:
        return (
          <Tag color={"red"} bordered={false}>
            ★★★
          </Tag>
        );
      default:
        return <></>;
    }
  };

  // eslint-disable-next-line
  const requestData: any = async (
    params: { pageSize: number; current: number },
    sort: Record<string, SortOrder>,
  ) => {
    const { current, pageSize } = params;
    setLoading(true);
    const result = await LeetcodeAPI.listLeetCodeQuestions(
      {
        page: current,
        pageSize,
      },
      sort,
    );
    setLoading(false);
    return { data: result.questions, total: result.total, success: true };
  };

  const columns: ProColumns<LeetCodeQuestion>[] = [
    {
      title: "No.",
      dataIndex: "question_frontend_id",
      width: 40,
      sorter: true,
      render: (text) => {
        return (
          <Tag color={"cyan-inverse"} bordered={false}>
            {(text || "").toString().padStart(5, "0")}
          </Tag>
        );
      },
    },
    {
      title: "状态",
      dataIndex: "status",
      width: 60,
      sorter: true,
      render: (text) => {
        switch (text) {
          case 0:
            return <></>;
          case 1:
            return (
              <Tag color={"green"} bordered={false}>
                队列中
              </Tag>
            );
          case 2:
            return (
              <Tag color={"red"} bordered={false}>
                已完成
              </Tag>
            );
          default:
            return (
              <Tag color={"gray"} bordered={false}>
                未知
              </Tag>
            );
        }
      },
    },
    {
      title: "问题",
      dataIndex: "title",
      width: 500,
      sorter: true,
      render: (text, record) => {
        const link = `https://leetcode.cn/problems/${record.title_slug}/description/`;
        const linkEn = `https://leetcode.com/problems/${record.title_slug}/description/`;
        return (
          <>
            <Space>
              <Link href={record.title_cn ? link : linkEn} target={"_blank"}>
                {record.title_cn || text}
              </Link>
              <Space>
                <Link href={record.title_cn ? linkEn : link} target={"_blank"}>
                  <Tag color={"cyan"} bordered={false}>
                    <TranslationOutlined />
                  </Tag>
                </Link>
                <Tag
                  color={record.is_paid_only ? "red" : "cyan"}
                  bordered={false}
                >
                  {record.is_paid_only ? <LockOutlined /> : <UnlockOutlined />}
                </Tag>
                {getDifficulty(record.difficulty)}
              </Space>
            </Space>
            <div style={{ height: 3 }}></div>
            <Space>
              <Text type="secondary">{record.title}</Text>
              {record.tags.map((tag) => {
                return (
                  <Tag color={"purple"} bordered={false}>
                    {tag.name}
                  </Tag>
                );
              })}
            </Space>
          </>
        );
      },
    },
    {
      title: "操作",
      width: 200,
      render: (_, record: LeetCodeQuestion) => {
        return (
          <Space>
            <Button
              size={"small"}
              key={"edit"}
              variant={"solid"}
              color={"primary"}
            >
              编辑
            </Button>
            <Button
              size={"small"}
              key={"delete"}
              color={"danger"}
              variant={"solid"}
            >
              删除
            </Button>
            {!record.title_cn && (
              <Button
                size={"small"}
                key={"refresh"}
                variant={"dashed"}
                color={"primary"}
                icon={<RedoOutlined />}
                onClick={async () => {
                  try {
                    setLoading(true);
                    const question = await LeetcodeAPI.translateQuestion(
                      record.id_auto,
                    );
                    if (question) {
                      if (actionRef.current) {
                        await actionRef.current.reload();
                      }
                      message.success("翻译成功");
                    } else {
                      message.error("翻译失败");
                    }
                  } finally {
                    setLoading(false);
                  }
                }}
              />
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <ProTable<LeetCodeQuestion>
      search={false}
      rowKey={"id_auto"}
      actionRef={actionRef}
      headerTitle={"LeetCode 问题列表"}
      loading={loading}
      columns={columns}
      request={requestData}
      editable={{
        type: "multiple",
      }}
      pagination={{
        pageSize: pageSize,
        current: page,
        onChange: (page, pageSize) => {
          setPage(page);
          setPageSize(pageSize);
        },
      }}
    />
  );
};
