import { z } from "zod";

export const GithubUser = z.object({
  login: z.string(),
  avatar_url: z.string(),
});

export const Issue = z.object({
  url: z.string(),
  html_url: z.string(),
  comments: z.number(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  number: z.number(),
  repository_url: z.string(),
  title: z.string(),
  draft: z.boolean(),
  user: GithubUser,
});

export const IssueResponse = z.object({
  total_count: z.number(),
  incomplete_results: z.boolean(),
  items: z.array(Issue),
});

export type GithubUser = z.infer<typeof GithubUser>;
export type Issue = z.infer<typeof Issue>;
export type IssueResponse = z.infer<typeof IssueResponse>;
