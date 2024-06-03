import { getApi } from "./api.ts";
import { mapResult } from "./mapResult.ts";
import { PullRequest } from "./types.ts";

export async function fetchAllOpenPrs(
  usernames: string[],
  baseUsername: string,
): Promise<PullRequest[]> {
  let after: string | undefined;
  let hasNextPage = true;
  const openPRs: PullRequest[] = [];

  while (hasNextPage) {
    const api = await getApi();
    const response = await api.getPullRequests(usernames, "open", 50, after);
    const mappedResult = mapResult(response, baseUsername);

    hasNextPage = mappedResult.hasNextPage;
    after = mappedResult.after;
    openPRs.push(...mappedResult.prs);
  }

  return openPRs;
}
