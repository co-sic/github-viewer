import fetch from 'node-fetch';
import { Handler, HandlerEvent } from '@netlify/functions';

const handler: Handler = async (event: HandlerEvent) => {
    const client_id = process.env.VITE_GITHUB_CLIENT_ID!;
    const client_secret = process.env.GITHUB_CLIENT_SECRET!;
    const code = event.body ? JSON.parse(event.body).code : null;

    if (!code) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Code is required' })
        };
    }

    try {
        const response = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                client_id,
                client_secret,
                code
            })
        });

        const data: any = await response.json();

        if (data.error) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: data.error })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};

export { handler };
