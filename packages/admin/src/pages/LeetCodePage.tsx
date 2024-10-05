import { PageContainer } from "@ant-design/pro-components";
import type { FC } from "react";
import { LeetCodeForm } from "@/pages/components/LeetCodeForm.tsx";

const LeetCodePage: FC = () => {
  return (
    <PageContainer title={"LeetCode 题目管理"}>
      <LeetCodeForm />
    </PageContainer>
  );
};

export default LeetCodePage;
