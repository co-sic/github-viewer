import { PullRequest } from "../../api";
import {
  Box,
  Chip,
  Link,
  ListItem,
  ListItemContent,
  Typography,
} from "@mui/joy";
import { timeAgo } from "../../utils";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

export interface PullRequestListItemProps {
  pullRequest: PullRequest;
  author: string;
  showRepository: boolean;
  showProject: boolean;
  showAuthor: boolean;
}

export function PullRequestListItem({
  pullRequest,
  author,
  showRepository,
  showProject,
  showAuthor,
  ...rest
}: PullRequestListItemProps) {
  return (
    <ListItem key={pullRequest.url} {...rest}>
      <ListItemContent>
        <Box sx={{ display: "flex", flexDirection: "row", gap: "6px" }}>
          {showRepository ? (
            <Link color="neutral" href={pullRequest.repositoryUrl}>
              <Typography noWrap>
                {pullRequest.repositoryUrl.split("/").pop()}
              </Typography>
            </Link>
          ) : null}
          <Link href={pullRequest.url}>
            <Typography noWrap> {pullRequest.title}</Typography>
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "6px",
            alignItems: "center",
          }}
        >
          <Typography level="body-sm">
            {`#${pullRequest.number} opened ${timeAgo(pullRequest.createdAt)}${
              showAuthor ? `  by ${author}` : ""
            }`}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "3px",
            }}
          >
            <InsertDriveFileOutlinedIcon />
            <Typography level="body-sm">{pullRequest.changedFiles}</Typography>
          </Box>
          {pullRequest.totalCommentCount > 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "3px",
              }}
            >
              <ChatBubbleOutlineIcon />
              <Typography level="body-sm">
                {pullRequest.totalCommentCount}
              </Typography>
            </Box>
          ) : null}
          {showProject && pullRequest.project ? (
            <Chip color="primary" size="sm" variant="soft">
              {pullRequest.project.title}
            </Chip>
          ) : null}
        </Box>
      </ListItemContent>
    </ListItem>
  );
}
