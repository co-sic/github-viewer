import { CssVarsProvider } from "@mui/joy/styles";
import { Box, Button, CssBaseline } from "@mui/joy";
import { PullRequestView } from "./pr";
import { OpenInNew } from "@mui/icons-material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthCallback } from "./AuthCallback";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PullRequestView />,
  },
  {
    path: "/login",
    element: (
      <Button
        component="a"
        href={`https://github.com/login/oauth/authorize?client_id=${
          import.meta.env.VITE_GITHUB_CLIENT_ID
        }`}
        startDecorator={<OpenInNew />}
      >
        Login with Github
      </Button>
    ),
  },
  {
    path: "/callback",
    element: <AuthCallback />,
  },
]);

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
          <RouterProvider router={router} />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
