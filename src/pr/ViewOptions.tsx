import { Box } from "@mui/joy";
import { useStore } from "../store";
import { GroupingSelect } from "./components";

export function ViewOptions() {
  const secondGroupState = useStore((store) => store.state.secondGroupState);
  const selectSecondGroupState = useStore(
    (store) => store.actions.selectSecondGroupState,
  );
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <GroupingSelect
        groupState={secondGroupState}
        handleChange={selectSecondGroupState}
      />
    </Box>
  );
}
