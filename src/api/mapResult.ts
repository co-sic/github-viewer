import {
  GetPullRequestsQuery,
  PullRequestReviewDecision,
} from "./operations.generated.ts";
import { PullRequest } from "./types.ts";

interface Response {
  prs: PullRequest[];
  hasNextPage: boolean;
  after: string | undefined;
}

export function mapResult(
  queryResult: GetPullRequestsQuery["search"],
  baseUsername: string,
): Response {
  const response: Response = {
    prs: [],
    hasNextPage: queryResult.pageInfo.hasNextPage,
    after: queryResult.pageInfo.endCursor ?? undefined,
  };

  for (const n of queryResult.nodes || []) {
    if (!n || n.__typename !== "PullRequest") {
      continue;
    }
    const pr: PullRequest = {
      url: n.url,
      headRefName: n.headRefName,
      createdAt: new Date(n.createdAt),
      updatedAt: new Date(n.updatedAt),
      number: n.number,
      repositoryUrl: n.repository.url,
      repositoryName: n.repository.url.split("/").pop()!,
      title: n.title,
      author: n.author!,
      state: n.state,
      reviews: [],
      totalCommentCount: 0,
      changedFiles: n.changedFiles,
      reviewDecision:
        n.reviewDecision ?? PullRequestReviewDecision.REVIEW_REQUIRED,
      reviewRequested:
        n.reviewRequests?.nodes?.some(
          (r) =>
            r?.requestedReviewer &&
            r.requestedReviewer.__typename === "User" &&
            r.requestedReviewer.login === baseUsername,
        ) ?? false,
      reviewed: false,
      project: null,
      priority: n.labels?.nodes?.some((l) => l?.name === "priority") ?? false,
    };
    if (n.reviews?.nodes) {
      for (const r of n.reviews.nodes) {
        if (!r) {
          continue;
        }
        pr.reviews.push({
          author: r.author!,
          createdAt: new Date(r.createdAt),
          state: r.state,
          commentCount: r.comments.nodes?.length ?? 0,
        });
        if (r.author?.login === baseUsername) {
          pr.reviewed = true;
        }
      }
    }
    pr.totalCommentCount = pr.reviews.reduce(
      (acc, r) => acc + r.commentCount,
      0,
    );
    response.prs.push(pr);
    const project = n.projectsV2.nodes?.[0];
    if (project) {
      pr.project = {
        title: project.title,
        number: project.number,
      };
    }
  }
  return response;
}
