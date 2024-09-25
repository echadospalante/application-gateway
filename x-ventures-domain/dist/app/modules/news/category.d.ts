import { News } from "./news";
export interface NewsCategory {
    id: number;
    name: string;
    slug: string;
    description: string;
    news: News[];
}
