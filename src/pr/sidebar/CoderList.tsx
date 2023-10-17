import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
} from "@mui/joy";
import { useStore } from "../../store";

export function CoderList() {
  const coders = useStore((store) => store.state.coders);
  const selectedCoder = useStore((store) => store.state.selectedCoder);
  const selectCoder = useStore((store) => store.actions.selectCoder);
  return (
    <List>
      {coders.map((coder) => (
        <ListItem key={coder.githubName}>
          <ListItemButton
            onClick={() => selectCoder(coder)}
            selected={coder.githubName === selectedCoder?.githubName}
          >
            <ListItemDecorator>
              <Avatar size="sm" src={coder.profilePictureUrl} />
            </ListItemDecorator>

            <ListItemContent>{`${coder.name} (${
              coder.openPrs ?? 0
            })`}</ListItemContent>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
