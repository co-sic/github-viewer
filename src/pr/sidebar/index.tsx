import { Box } from "@mui/joy";
import { AuthorList } from "./AuthorList.tsx";
import { RepositoryList } from "./RepositoryList.tsx";
import { useStore } from "../../store";
import { GroupState } from "../../store/types.ts";
import { GroupingSelect } from "../components";
import { ReviewStateList } from "./ReviewStateList.tsx";
import { ProjectList } from "./ProjectList.tsx";

export function PullRequestSideBar() {
  const firstGroupState = useStore((store) => store.state.firstGroupState);
  const selectFirstGroupState = useStore(
    (store) => store.actions.selectFirstGroupState,
  );
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <GroupingSelect
        groupState={firstGroupState}
        handleChange={selectFirstGroupState}
      />
      {firstGroupState === GroupState.CODER ? <AuthorList /> : null}
      {firstGroupState === GroupState.REPOSITORY ? <RepositoryList /> : null}
      {firstGroupState === GroupState.REVIEW ? <ReviewStateList /> : null}
      {firstGroupState === GroupState.PROJECT ? <ProjectList /> : null}
    </Box>
  );
}
