import { CssVarsProvider } from "@mui/joy/styles";
import { Box, CssBaseline } from "@mui/joy";
import { PullRequestView } from "./pr";

export function App() {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh", overflowY: "hidden" }}>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            height: "100dvh",
            mx: "auto",
            py: "40px",
            px: "20px",
            maxWidth: "1200px",
            justifyContent: "stretch",
            overflowY: "hidden",
          }}
        >
          <PullRequestView />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
