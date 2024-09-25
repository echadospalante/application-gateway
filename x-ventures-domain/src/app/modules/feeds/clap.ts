import { User } from "../auth";
import { Publication } from "./publication";

export interface PublicationClap {
  id: number;
  user: User;
  publication: Publication;
  createdAt: Date;
}
