import { Venture } from "./venture";
export interface VentureCategory {
    id: string;
    name: string;
    slug: string;
    description: string;
    ventures: Venture[];
}
