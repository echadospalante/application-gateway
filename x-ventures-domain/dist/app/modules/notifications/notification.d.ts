import { User } from "../auth";
export interface Notification {
    id: string;
    title: string;
    user: User;
    type: NotificationType;
    status: NotificationStatus;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum NotificationType {
    WELCOME = "WELCOME",
    ACCOUNT_VERIFIED = "ACCOUNT_VERIFIED",
    ACCOUNT_LOCKED = "ACCOUNT_LOCKED",
    ACCOUNT_UNLOCKED = "ACCOUNT_UNLOCKED",
    NEW_FOLLOWER = "NEW_FOLLOWER",
    NEW_COMMENT = "NEW_COMMENT",
    NEW_SPONSOR = "NEW_SPONSOR",
    NEW_DONATION = "NEW_DONATION"
}
export declare enum NotificationStatus {
    READ = "READ",
    UNREAD = "UNREAD"
}
