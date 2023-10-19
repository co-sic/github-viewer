import { GithubGraphqlClient } from "./GithubGraphqlClient.ts";

const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;

export const api = new GithubGraphqlClient(AUTH_TOKEN);
