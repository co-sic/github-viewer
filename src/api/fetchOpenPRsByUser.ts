import { GithubGraphqlClient } from "./GithubGraphqlClient.ts";
import {
  PullRequestReviewDecision,
  PullRequestReviewState,
  PullRequestState,
} from "./operations.generated.ts";

const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;

export interface PullRequestAuthor {
  login: string;
  avatarUrl: string;
}

export interface PullRequestReview {
  author: PullRequestAuthor;
  createdAt: Date;
  state: PullRequestReviewState;
  commentCount: number;
}

export interface Project {
  title: string;
  number: number;
}

export interface PullRequest {
  url: string;
  createdAt: Date;
  updatedAt: Date;
  number: number;
  repositoryUrl: string;
  repositoryName: string;
  title: string;
  author: PullRequestAuthor;
  state: PullRequestState;
  reviews: PullRequestReview[];
  totalCommentCount: number;
  changedFiles: number;
  reviewDecision: PullRequestReviewDecision;
  reviewRequested: boolean;
  reviewed: boolean;
  project: Project | null;
}

export async function fetchOpenPRsByUser(
  username: string,
  baseUsername: string,
): Promise<PullRequest[]> {
  let after: string | undefined;
  let hasNextPage = true;
  const openPRs: PullRequest[] = [];

  console.log("Fetching open PRs for user:", username);

  const api = new GithubGraphqlClient(AUTH_TOKEN);

  while (hasNextPage) {
    const response = await api.getPullRequests(username, after);
    hasNextPage = response.pageInfo.hasNextPage;
    after = response.pageInfo.endCursor ?? undefined;
    if (!response.nodes) {
      continue;
    }
    for (const n of response.nodes) {
      if (!n || n.__typename !== "PullRequest") {
        continue;
      }
      const pr: PullRequest = {
        url: n.url,
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
      openPRs.push(pr);
      const project = n.projectsV2.nodes?.[0];
      if (project) {
        pr.project = {
          title: project.title,
          number: project.number,
        };
      }
    }
  }

  return openPRs;
}
