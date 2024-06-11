interface TokenResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    refresh_token_expires_in: number;
}

export function storeToken({
    access_token,
    refresh_token,
    expires_in,
    refresh_token_expires_in
}: TokenResponse) {
    localStorage.setItem('github_access_token', access_token);
    localStorage.setItem('github_refresh_token', refresh_token);
    localStorage.setItem('github_token_expiry', (Date.now() + expires_in * 1000).toString());
    localStorage.setItem('github_refresh_token_expiry', (Date.now() + refresh_token_expires_in * 1000).toString());
}

async function refreshAccessToken() {
    const refreshToken = localStorage.getItem('github_refresh_token');
    if (!refreshToken) {
        throw new Error('No refresh token found');
    }
    fetch("/.netlify/functions/refresh-token", {
        method: "POST",
        body: JSON.stringify({ refreshToken}),
    })
        .then((response) => response.json())
        .then((data) => {
            storeToken(data)
        })
}

export async function getAccessToken() {
    const token = localStorage.getItem('github_access_token');
    const expiry = localStorage.getItem('github_token_expiry');
    if (!token || !expiry) {
        throw new Error('No token found');
    }

    if (parseInt(expiry) < Date.now()) {
        await refreshAccessToken();
    }

    return token ?? '';
}
