import axios from "axios";

export enum LeetCodeRegion {
  CN = "CN",
  Global = "Global",
}

export class GraphQLUtils {
  static queryGraphQL(
    query: string,
    variables: object,
    operationName: string,
    region: LeetCodeRegion = LeetCodeRegion.Global,
  ) {
    return axios.post(
      region === LeetCodeRegion.Global
        ? "https://leetcode.com/graphql/"
        : "https://leetcode.cn/graphql/",
      {
        query: query,
        variables,
        operationName,
      },
      {
        headers: {
          Host:
            region === LeetCodeRegion.Global ? "leetcode.com" : "leetcode.cn",
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
        },
        timeout: 10000,
      },
    );
  }
}
