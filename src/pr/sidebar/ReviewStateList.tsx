import { List, ListItem, ListItemButton, ListItemContent } from "@mui/joy";
import { useStore } from "../../store";

export function ReviewStateList() {
  const reviewStates = useStore((store) => store.state.reviewStates);
  const selectedReviewState = useStore(
    (store) => store.state.selectedReviewState,
  );
  const selectReviewState = useStore(
    (store) => store.actions.selectReviewState,
  );

  return (
    <List>
      {reviewStates.map((reviewState) => (
        <ListItem key={reviewState.state}>
          <ListItemButton
            onClick={() => selectReviewState(reviewState)}
            selected={reviewState.state === selectedReviewState?.state}
          >
            <ListItemContent>{`${reviewState.label} (${
              reviewState.openPrs ?? 0
            })`}</ListItemContent>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
