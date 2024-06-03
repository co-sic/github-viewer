import { Box, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { storeToken } from "./utils";

export const AuthCallback = () => {
    const navigate = useNavigate();
    const [urlSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        if (urlSearchParams.get("code") != null) {
            setLoading(true);
            fetch("/.netlify/functions/exchange-token", {
                method: "POST",
                body: JSON.stringify({ code: urlSearchParams.get("code") }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setLoading(false);
                    storeToken(data)
                    navigate("/");
                })
                .catch((error) => {
                    setLoading(false);
                    setErrors([error.message])
                });
        } else {
            setErrors(["No code found in URL."])
        }

    }, [urlSearchParams]);

    return (
        <Box sx={{ display: "flex", minHeight: "100dvh", overflowY: "hidden" }}>
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    height: "100dvh",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {loading && errors.length === 0 ? "Loading..." : null}
                {!loading && errors.length !== 0 ? errors.map(error => <Typography>{error}</Typography>) : null}
            </Box>
        </Box>
    );
};
