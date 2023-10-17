import { Project, PullRequest } from "../api";

export interface ProjectDefinition {
  project: Project | null;
  openPrs?: number;
}

export interface Coder {
  name: string;
  githubName: string;
  profilePictureUrl?: string;
  openPrs?: number;
}

export interface RepositoryDefinition {
  name: string;
  url: string;
  openPrs?: number;
}

export enum ReviewState {
  REQUESTED = "REQUESTED",
  REVIEWED = "REVIEWED",
  NONE = "NONE",
}

export interface ReviewStateDefinition {
  state: ReviewState;
  label: string;
  openPrs?: number;
}

export interface MainState {
  pullRequests: PullRequest[];
  // Grouping and sorting
  firstGroupState: GroupState;
  secondGroupState: GroupState;
  sortState: SortState;
  // Coder
  coders: Coder[];
  selectedCoder: Coder | null;
  // Repository
  repositories: RepositoryDefinition[];
  selectedRepository: RepositoryDefinition | null;
  // Review States
  reviewStates: ReviewStateDefinition[];
  selectedReviewState: ReviewStateDefinition | null;
  // Projects
  projects: ProjectDefinition[];
  selectedProject: ProjectDefinition | null;
}

export interface MainActions {
  // select actions
  selectFirstGroupState: (viewState: GroupState) => void;
  selectSecondGroupState: (groupState: GroupState) => void;
  selectSortState: (sortState: SortState) => void;
  selectCoder: (coder: Coder) => void;
  selectRepository: (repository: RepositoryDefinition) => void;
  selectReviewState: (reviewState: ReviewStateDefinition) => void;
  selectProject: (project: ProjectDefinition) => void;

  // set options
  setPullRequests: (prs: PullRequest[]) => void;
  setCoders: (coders: Coder[]) => void;
  setRepositories: (repositories: RepositoryDefinition[]) => void;
  setReviewStates: (reviewStates: ReviewStateDefinition[]) => void;
  setProjects: (projects: ProjectDefinition[]) => void;
}

export interface MainStore {
  state: MainState;
  actions: MainActions;
}

export enum GroupState {
  NONE = "NONE",
  REVIEW = "REVIEW",
  CODER = "CODER",
  REPOSITORY = "REPOSITORY",
  PROJECT = "PROJECT",
}

export enum SortField {
  AGE = "AGE",
  REVIEW_COUNT = "REVIEW_COUNT",
  FILE_COUNT = "FILE_COUNT",
}

export interface SortState {
  field: SortField;
  direction: "ASC" | "DESC";
}
