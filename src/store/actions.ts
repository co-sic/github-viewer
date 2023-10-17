import { StoreApi } from "zustand";
import {
  Coder,
  GroupState,
  MainStore,
  ProjectDefinition,
  RepositoryDefinition,
  ReviewStateDefinition,
  SortState,
} from "./types.ts";
import { Draft, produce } from "immer";
import { PullRequest } from "../api";

type WritableDraft<T> = {
  -readonly [K in keyof T]: Draft<T[K]>;
};

type SetState = StoreApi<MainStore>["setState"];

function withProduce(
  set: SetState,
  callback: (store: WritableDraft<MainStore>) => void,
): void {
  return set(produce<MainStore>(callback));
}

export function selectCoder(set: SetState, coder: Coder) {
  withProduce(set, (store) => {
    store.state.selectedCoder = coder;
  });
}

export function selectRepository(
  set: SetState,
  repository: RepositoryDefinition,
) {
  withProduce(set, (store) => {
    store.state.selectedRepository = repository;
  });
}

export function setCoders(set: SetState, coders: Coder[]) {
  withProduce(set, (store) => {
    store.state.coders = coders;
  });
}

export function setRepositories(
  set: SetState,
  repositories: RepositoryDefinition[],
) {
  withProduce(set, (store) => {
    store.state.repositories = repositories;
  });
}
export function setReviewStates(
  set: SetState,
  reviewStates: ReviewStateDefinition[],
) {
  withProduce(set, (store) => {
    store.state.reviewStates = reviewStates;
  });
}

export function setPullRequests(set: SetState, pullRequests: PullRequest[]) {
  withProduce(set, (store) => {
    store.state.pullRequests = pullRequests;
  });
}

export function setProjects(set: SetState, projects: ProjectDefinition[]) {
  withProduce(set, (store) => {
    store.state.projects = projects;
  });
}

export function selectFirstGroupState(set: SetState, groupState: GroupState) {
  withProduce(set, (store) => {
    store.state.firstGroupState = groupState;
  });
}

export function selectSecondGroupState(set: SetState, groupState: GroupState) {
  withProduce(set, (store) => {
    store.state.secondGroupState = groupState;
  });
}

export function selectSortState(set: SetState, sortState: SortState) {
  withProduce(set, (store) => {
    store.state.sortState = sortState;
  });
}

export function selectReviewState(
  set: SetState,
  reviewState: ReviewStateDefinition,
) {
  withProduce(set, (store) => {
    store.state.selectedReviewState = reviewState;
  });
}

export function selectProject(
  set: SetState,
  selectedProject: ProjectDefinition,
) {
  withProduce(set, (store) => {
    store.state.selectedProject = selectedProject;
  });
}
