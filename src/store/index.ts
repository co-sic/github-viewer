import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
  Coder,
  GroupState,
  MainStore,
  ReviewState,
  ReviewStateDefinition,
  SortField,
} from "./types.ts";
import {
  selectCoder,
  selectFirstGroupState,
  selectProject,
  selectRepository,
  selectReviewState,
  selectSecondGroupState,
  selectSortState,
  setCoders,
  setProjects,
  setPullRequests,
  setRepositories,
  setReviewStates,
} from "./actions.ts";

function getInitialCoders(): Coder[] {
  const coderString = import.meta.env.VITE_CODERS_INITIAL;
  return coderString.split("|").map((str: string) => {
    const splitStr = str.split(",");
    return {
      githubName: splitStr[0],
      name: splitStr[1],
    };
  });
}

// const initialCoders: Coder[] = [
//   { name: "Patrick", githubName: "co-sic" },
//   { name: "Nabh", githubName: "nkgastromatic" },
//   { name: "Caio", githubName: "CaioNarvaez" },
//   { name: "Byamba", githubName: "Byambajav-M" },
//   { name: "Lhahvaa", githubName: "erinLkhagvadorj" },
//   { name: "Dashka", githubName: "DashnyamB" },
// ];

const initialReviewStates: ReviewStateDefinition[] = [
  { state: ReviewState.REQUESTED, label: "Requested" },
  { state: ReviewState.REVIEWED, label: "Reviewed" },
  { state: ReviewState.NONE, label: "None" },
];

export const useStore = create<MainStore>()(
  devtools(
    persist(
      (set) => ({
        state: {
          firstGroupState: GroupState.CODER,
          secondGroupState: GroupState.NONE,
          sortState: { field: SortField.AGE, direction: "DESC" },
          coders: getInitialCoders(),
          selectedCoder: null,
          repositories: [],
          selectedRepository: null,
          pullRequests: [],
          reviewStates: initialReviewStates,
          selectedReviewState: null,
          projects: [],
          selectedProject: null,
        },
        actions: {
          selectCoder: (coder) => selectCoder(set, coder),
          selectRepository: (repository) => selectRepository(set, repository),
          selectReviewState: (reviewState) =>
            selectReviewState(set, reviewState),
          selectSortState: (sortState) => selectSortState(set, sortState),
          setCoders: (coders) => setCoders(set, coders),
          setRepositories: (repositories) => setRepositories(set, repositories),
          setReviewStates: (reviewStates) => setReviewStates(set, reviewStates),
          setPullRequests: (prs) => setPullRequests(set, prs),
          selectFirstGroupState: (groupState) =>
            selectFirstGroupState(set, groupState),
          selectSecondGroupState: (groupState) =>
            selectSecondGroupState(set, groupState),
          setProjects: (projects) => setProjects(set, projects),
          selectProject: (project) => selectProject(set, project),
        },
      }),
      {
        name: "store",
        partialize: ({ actions, ...storeRest }) => {
          return { state: storeRest.state };
        },
      },
    ),
  ),
);

export * from "./types.ts";
