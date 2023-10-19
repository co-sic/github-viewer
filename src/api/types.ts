import {
  PullRequestReviewDecision,
  PullRequestReviewState,
  PullRequestState,
} from "./operations.generated.ts";

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
