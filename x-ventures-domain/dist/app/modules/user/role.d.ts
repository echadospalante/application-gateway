import { User } from "./user";
export declare enum AppRole {
    ADMIN = "ADMIN",
    USER = "USER",
    MODERATOR = "MODERATOR",
    NEWS_WRITER = "NEWS_WRITER"
}
export interface Role {
    id: string;
    name: AppRole;
    label: string;
    createdAt: Date;
    updatedAt: Date;
    users?: User[];
}
