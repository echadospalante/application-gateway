import { ContentType } from "../shared";
import { NewsCategory } from "./category";
import { NewsClap } from "./clap";

export interface News {
  id: string;
  title: string;
  slug: string;
  claps: NewsClap[];
  comments: Comment[];
  body: NewsContent[];
  categories: NewsCategory[];
  createdAt: Date;
}

export interface NewsContent {
  id: string;
  type: ContentType;
  content: string; // JSON string
}
