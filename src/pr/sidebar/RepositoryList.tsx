import { List, ListItem, ListItemButton, ListItemContent } from "@mui/joy";
import { useStore } from "../../store";

export function RepositoryList() {
  const repositories = useStore((store) => store.state.repositories);
  const selectedRepository = useStore(
    (store) => store.state.selectedRepository,
  );
  const selectRepository = useStore((store) => store.actions.selectRepository);

  return (
    <List>
      {repositories.map((repository) => (
        <ListItem key={repository.name}>
          <ListItemButton
            onClick={() => selectRepository(repository)}
            selected={repository.name === selectedRepository?.name}
          >
            <ListItemContent>{`${repository.name} (${
              repository.openPrs ?? 0
            })`}</ListItemContent>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
