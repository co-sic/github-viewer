import { Option, Select, selectClasses } from "@mui/joy";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { GroupState } from "../../store";

const views = [
  { type: GroupState.NONE, label: "None" },
  { type: GroupState.CODER, label: "By author" },
  { type: GroupState.REPOSITORY, label: "By repository" },
  { type: GroupState.REVIEW, label: "By review" },
  { type: GroupState.PROJECT, label: "By project" },
];

export interface GroupingSelectProps {
  groupState: GroupState;
  handleChange: (groupSate: GroupState) => void;
}

export function GroupingSelect({
  groupState,
  handleChange,
}: GroupingSelectProps) {
  return (
    <Select
      value={groupState}
      onChange={(_, newValue) => {
        if (newValue) {
          handleChange(newValue);
        }
      }}
      variant="outlined"
      size="sm"
      indicator={<KeyboardArrowDown />}
      sx={{
        width: 150,
        [`& .${selectClasses.indicator}`]: {
          transition: "0.2s",
          [`&.${selectClasses.expanded}`]: {
            transform: "rotate(-180deg)",
          },
        },
      }}
    >
      {views.map((v) => (
        <Option value={v.type} key={v.type}>
          {v.label}
        </Option>
      ))}
    </Select>
  );
}
