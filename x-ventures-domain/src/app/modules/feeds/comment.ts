import { User } from "../auth";
import { Publication } from "./publication";

export interface Comment {
  id: string;
  author: User;
  content: string;
  publication: Publication;
}
