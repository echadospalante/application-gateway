import { User } from "../auth";
import { News } from "./news";
export interface NewsClap {
    id: number;
    user: User;
    news: News;
    createdAt: Date;
}
