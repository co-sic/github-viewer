import { Box, Button, LinearProgress, Typography } from "@mui/joy";
import { PullRequestSideBar } from "./sidebar";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import { PullRequestList } from "./list";
import { useState } from "react";
import { useCurrentUser } from "../providers";
import { useStore } from "../store";
import { ViewOptions } from "./ViewOptions.tsx";
import { fetchAndGroupPullRequests } from "./fetchAndGroupPullRequests.ts";

export function PullRequestView() {
  const [reloading, setReloading] = useState(false);
  const user = useCurrentUser();
  const {
    setPullRequests,
    setCoders,
    setRepositories,
    setReviewStates,
    setProjects,
  } = useStore((store) => store.actions);
  const coders = useStore((store) => store.state.coders);
  const reviewStates = useStore((store) => store.state.reviewStates);

  const load = async () => {
    const data = await fetchAndGroupPullRequests(
      coders,
      reviewStates,
      user.login,
    );
    setPullRequests(data.prs);
    setCoders(data.coders);
    setRepositories(data.repositories);
    setReviewStates(data.reviewStates);
    setProjects(data.projects);
  };

  const handleReload = async () => {
    setReloading(true);
    try {
      await load();
    } catch (err) {
      console.error(err);
    }
    setReloading(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "30px",
        overflowY: "hidden",
      }}
    >
      <Box sx={{ width: "260px" }}>
        <PullRequestSideBar />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          flexGrow: 1,
          overflowY: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "12px",
            }}
          >
            <Typography level="h4">Pull Requests</Typography>
            <ViewOptions />
          </Box>

          <Button
            loading={reloading}
            onClick={handleReload}
            variant="soft"
            color="neutral"
            size="sm"
          >
            <CachedOutlinedIcon />
          </Button>
        </Box>
        <Box sx={{ height: "4px" }}>
          {reloading ? <LinearProgress thickness={2} /> : null}
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          <PullRequestList />
        </Box>
      </Box>
    </Box>
  );
}
