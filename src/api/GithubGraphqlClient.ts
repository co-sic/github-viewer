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

  async getPullRequests(userName: string, after?: string) {
    return (
      await this.sdk.GetPullRequests(
        {
          query: `is:pr author:${userName} is:open`,
          first: 20,
          after,
        },
        { ...this.getHeaders() },
      )
    ).search;
  }
}
