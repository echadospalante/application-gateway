import { User } from "../auth";
import { VentureCategory } from "./category";
import { VentureDetail } from "./detail";
export interface Venture {
    id: string;
    name: string;
    slug: string;
    coverPhoto: string;
    description: string;
    owner: User;
    active: boolean;
    verified: boolean;
    detail: VentureDetail;
    categories: VentureCategory[];
    createdAt: Date;
}
