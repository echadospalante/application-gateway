import { User } from "../auth";
import { ContentType } from "../shared";
import { Venture } from "../ventures/venture";
import { PublicationClap } from "./clap";

export interface Publication {
  id: string;
  author: User;
  description: string;
  venture: Venture;
  type: PublicationType;
  claps: PublicationClap[];
  comments: Comment[];
  body: PublicationContent[];
  createdAt: Date;
}

export enum PublicationType {
  TEXTUAL = "TEXTUAL",
  VIDEO = "VIDEO",
  IMAGE = "IMAGE",
  ANNOUNCEMENT = "ANNOUNCEMENT",
  ACHIEVEMENT = "ACHIEVEMENT",
}

export interface PublicationContent {
  id: string;
  type: ContentType;
  content: string; // JSON string
}
