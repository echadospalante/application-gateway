import { User } from "../auth";
import { VentureCategory } from "../ventures";
import { Contact } from "./contact";
export interface Profile {
    id: string;
    verified: boolean;
    user: User;
    preferences: VentureCategory[];
    contact: Contact;
    createdAt: Date;
}
