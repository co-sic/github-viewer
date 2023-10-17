import { List, ListItem, ListItemButton, ListItemContent } from "@mui/joy";
import { useStore } from "../../store";

export function ProjectList() {
  const projects = useStore((store) => store.state.projects);
  const selectedProject = useStore((store) => store.state.selectedProject);
  const selectProject = useStore((store) => store.actions.selectProject);

  return (
    <List>
      {projects.map((project) => (
        <ListItem key={project.project?.number.toString() || "none"}>
          <ListItemButton
            onClick={() => selectProject(project)}
            selected={project.project === selectedProject?.project}
          >
            <ListItemContent>{`${project.project?.title ?? "None"} (${
              project.openPrs ?? 0
            })`}</ListItemContent>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
