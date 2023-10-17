import { GroupState, ReviewState, useStore } from "../../store";
import { Box, Divider, List, Typography } from "@mui/joy";
import { PullRequestListItem } from "./Item.tsx";
import { PullRequest } from "../../api";

interface GroupDefinition {
  pullRequests: PullRequest[];
  name: string;
}

export function PullRequestList() {
  const {
    firstGroupState,
    secondGroupState,
    pullRequests,
    selectedCoder,
    selectedRepository,
    selectedReviewState,
    coders,
    selectedProject,
  } = useStore((store) => store.state);

  const showRepositoryLink = ![firstGroupState, secondGroupState].includes(
    GroupState.REPOSITORY,
  );
  const showAuthor = ![firstGroupState, secondGroupState].includes(
    GroupState.CODER,
  );
  const showProject = ![firstGroupState, secondGroupState].includes(
    GroupState.PROJECT,
  );

  const coderMap = new Map(coders.map((c) => [c.githubName, c]));

  const selectedPullRequests = pullRequests.filter((pr) => {
    if (
      firstGroupState === GroupState.CODER &&
      selectedCoder &&
      selectedCoder.githubName === pr.author.login
    ) {
      return true;
    }
    if (
      firstGroupState === GroupState.REPOSITORY &&
      selectedRepository &&
      selectedRepository.url === pr.repositoryUrl
    ) {
      return true;
    }
    if (firstGroupState === GroupState.REVIEW && selectedReviewState) {
      let state = ReviewState.NONE;
      if (pr.reviewed) {
        state = ReviewState.REVIEWED;
      }
      if (pr.reviewRequested) {
        state = ReviewState.REQUESTED;
      }
      return selectedReviewState.state === state;
    }
    if (firstGroupState === GroupState.PROJECT && selectedProject) {
      const selectedProjectId = selectedProject.project?.number ?? -10;
      const currentProjectId = pr.project?.number ?? -10;
      if (selectedProjectId === currentProjectId) {
        return true;
      }
    }
    if (firstGroupState === GroupState.NONE) {
      return true;
    }
    return false;
  });

  if (secondGroupState === GroupState.NONE) {
    return (
      <List sx={{ flexGrow: 0 }}>
        {selectedPullRequests.map((pr) => (
          <PullRequestListItem
            pullRequest={pr}
            key={pr.url}
            author={coderMap.get(pr.author.login)?.name ?? pr.author.login}
            showRepository={showRepositoryLink}
            showAuthor={showAuthor}
            showProject={showProject}
          />
        ))}
      </List>
    );
  }

  const groupDefinitions: GroupDefinition[] = [];
  if (secondGroupState === GroupState.REPOSITORY) {
    const repositoryMap: Map<string, PullRequest[]> = new Map();
    for (const pr of selectedPullRequests) {
      repositoryMap.set(pr.repositoryName, [
        ...(repositoryMap.get(pr.repositoryName) ?? []),
        pr,
      ]);
    }
    for (const [key, value] of repositoryMap.entries()) {
      groupDefinitions.push({
        name: key,
        pullRequests: value,
      });
    }
  }
  if (secondGroupState === GroupState.CODER) {
    const repositoryMap: Map<string, PullRequest[]> = new Map();
    for (const pr of selectedPullRequests) {
      repositoryMap.set(pr.author.login, [
        ...(repositoryMap.get(pr.author.login) ?? []),
        pr,
      ]);
    }
    for (const [key, value] of repositoryMap.entries()) {
      groupDefinitions.push({
        name: key,
        pullRequests: value,
      });
    }
  }
  if (secondGroupState === GroupState.REVIEW) {
    const repositoryMap: Map<string, PullRequest[]> = new Map();
    for (const pr of selectedPullRequests) {
      let name = ReviewState.NONE;

      if (pr.reviewed) {
        name = ReviewState.REVIEWED;
      }
      if (pr.reviewRequested) {
        name = ReviewState.REQUESTED;
      }
      repositoryMap.set(name, [...(repositoryMap.get(name) ?? []), pr]);
    }
    const requested = repositoryMap.get(ReviewState.REQUESTED);
    if (requested) {
      groupDefinitions.push({
        name: "Requested",
        pullRequests: requested,
      });
    }
    const reviewed = repositoryMap.get(ReviewState.REVIEWED);
    if (reviewed) {
      groupDefinitions.push({
        name: "Reviewed",
        pullRequests: reviewed,
      });
    }
    const none = repositoryMap.get(ReviewState.NONE);
    if (none) {
      groupDefinitions.push({
        name: "None",
        pullRequests: none,
      });
    }
  }
  if (secondGroupState === GroupState.PROJECT) {
    const noProject: PullRequest[] = [];
    const projectMap: Map<string, PullRequest[]> = new Map();
    for (const pr of selectedPullRequests) {
      if (pr.project) {
        projectMap.set(pr.project.title, [
          ...(projectMap.get(pr.project.title) ?? []),
          pr,
        ]);
      } else {
        noProject.push(pr);
      }
    }
    for (const [key, value] of projectMap.entries()) {
      groupDefinitions.push({
        name: key,
        pullRequests: value,
      });
    }
    if (noProject.length) {
      groupDefinitions.push({
        name: "None",
        pullRequests: noProject,
      });
    }
  }

  return (
    <Box
      sx={{ flexGrow: 0, display: "flex", flexDirection: "column", gap: "6px" }}
    >
      {groupDefinitions.map(({ name, pullRequests }, index) => (
        <Box
          sx={{
            flexGrow: 0,
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
          key={name}
        >
          <Typography level="title-md">{name}</Typography>
          <List>
            {pullRequests.map((pr) => (
              <PullRequestListItem
                pullRequest={pr}
                key={pr.url}
                author={coderMap.get(pr.author.login)?.name ?? pr.author.login}
                showRepository={showRepositoryLink}
                showAuthor={showAuthor}
                showProject={showProject}
              />
            ))}
          </List>
          {index < groupDefinitions.length - 1 ? <Divider /> : null}
        </Box>
      ))}
    </Box>
  );
}
