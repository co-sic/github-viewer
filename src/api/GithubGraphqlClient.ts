import { GraphQLClient } from "graphql-request";
import { getSdk } from "./operations.generated";

export class GithubGraphqlClient {
  private sdk;

  private authToken: string;

  constructor(authToken: string) {
    this.sdk = getSdk(new GraphQLClient("https://api.github.com/graphql"));
    this.authToken = authToken;
  }

  private getHeaders() {
    return {
      Authorization: `bearer ${this.authToken}`,
      "Content-Type": "application/json",
    };
  }

  async getPullRequests(
    userNames: string[],
    status: "open" | "merged",
    first: number,
    after?: string,
  ) {
    return (
      await this.sdk.GetPullRequests(
        {
          query: `is:pr is:${status} ${userNames
            .map((name) => `author:${name}`)
            .join(" ")}`,
          first,
          after,
        },
        { ...this.getHeaders() },
      )
    ).search;
  }
}
