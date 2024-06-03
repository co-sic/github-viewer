import { GithubGraphqlClient } from "./GithubGraphqlClient.ts";
import { getAccessToken } from "../utils";

let api: GithubGraphqlClient;

export async function getApi() {
    if (!api) {
        api = new GithubGraphqlClient(await getAccessToken());
    }
    return api;
}
