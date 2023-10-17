import {
  Coder,
  ProjectDefinition,
  RepositoryDefinition,
  ReviewState,
  ReviewStateDefinition,
} from "../store";
import { fetchOpenPRsByUser, PullRequest } from "../api";

export interface FetchPullRequestResult {
  prs: PullRequest[];
  coders: Coder[];
  repositories: RepositoryDefinition[];
  projects: ProjectDefinition[];
  reviewStates: ReviewStateDefinition[];
}

export async function fetchAndGroupPullRequests(
  coders: Coder[],
  reviewStates: ReviewStateDefinition[],
  login: string,
): Promise<FetchPullRequestResult> {
  const data: FetchPullRequestResult = {
    prs: [],
    coders: [],
    repositories: [],
    projects: [],
    reviewStates: [],
  };

  const res = await Promise.all(
    coders.map((coder) => fetchOpenPRsByUser(coder.githubName, login)),
  );
  const prs = res.flat();
  data.prs.push(...prs);
  data.coders.push(
    ...coders.map((c, idx) => {
      const profilePictureUrl = res[idx][0]?.author.avatarUrl;
      return { ...c, profilePictureUrl, openPrs: res[idx].length };
    }),
  );
  data.repositories.push(
    ...[...new Set(prs.map((pr) => pr.repositoryUrl))]
      .map((url) => ({
        name: url.split("/").pop() || "",
        url,
        openPrs: prs.filter((pr) => pr.repositoryUrl === url).length,
      }))
      .sort((r1, r2) => r2.openPrs - r1.openPrs),
  );
  const reviewStatePrCountMap = new Map<ReviewState, number>();
  for (const pr of prs) {
    if (pr.reviewRequested) {
      reviewStatePrCountMap.set(
        ReviewState.REQUESTED,
        (reviewStatePrCountMap.get(ReviewState.REQUESTED) ?? 0) + 1,
      );
    } else if (pr.reviewed) {
      reviewStatePrCountMap.set(
        ReviewState.REVIEWED,
        (reviewStatePrCountMap.get(ReviewState.REVIEWED) ?? 0) + 1,
      );
    } else {
      reviewStatePrCountMap.set(
        ReviewState.NONE,
        (reviewStatePrCountMap.get(ReviewState.NONE) ?? 0) + 1,
      );
    }
  }

  data.reviewStates.push(
    ...reviewStates.map((rs) => ({
      ...rs,
      openPrs: reviewStatePrCountMap.get(rs.state) ?? 0,
    })),
  );

  const noProject: ProjectDefinition = { project: null, openPrs: 0 };
  const projectMap = new Map<number, ProjectDefinition>();

  for (const pr of prs) {
    if (!pr.project) {
      noProject.openPrs = (noProject.openPrs ?? 0) + 1;
    } else {
      const projectDef = projectMap.get(pr.project.number) ?? {
        project: pr.project,
        openPrs: 0,
      };
      projectDef.openPrs = (projectDef.openPrs ?? 0) + 1;
      projectMap.set(pr.project.number, projectDef);
    }
  }
  data.projects.push(...projectMap.values(), noProject);
  return data;
}
