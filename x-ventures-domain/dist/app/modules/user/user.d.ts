import { Venture } from "../ventures/venture";
import { Role } from "./role";
import { Notification } from "../notifications";
import { Comment } from "../feeds/comment";
import { UserDetail } from "./detail";
import { VentureCategory } from "../ventures";
export interface User {
    id: string;
    picture: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: Role[];
    detail?: UserDetail;
    notifications: Notification[];
    ventures: Venture[];
    comments: Comment[];
    preferences: VentureCategory[];
    active: boolean;
    verified: boolean;
    onboardingCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export type UserCreate = Pick<User, "email" | "firstName" | "lastName" | "picture">;
