# github-viewer

## github app setup

Follow [this guide](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/registering-a-github-app) on how to create a GitHub App and add the homepage URL and callback URL according to your netlify app.

**Homepage URL**: https://your-netlify-prefix.netlify.app/

**Callback URL**: https://your-netlify-prefix.app/callback


## netlify setup

For this you can follow [this getting started page](https://docs.netlify.com/cli/get-started).

But these three commands should be enough:

```bash
npm install netlify-cli -g
netlify login
netlify init
```

After this add these env vars to netlify:

**Any env var without the prefix VITE will not be available on the client side**

```
GITHUB_CLIENT_SECRET=<githubAppSecret>
VITE_GITHUB_CLIENT_ID=<githubAppId>
VITE_CODERS_INITIAL=<githubCoders> // username1,displayName1|username2,displayName2|...
```
