"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationStatus = exports.NotificationType = void 0;
var NotificationType;
(function (NotificationType) {
    NotificationType["WELCOME"] = "WELCOME";
    NotificationType["ACCOUNT_VERIFIED"] = "ACCOUNT_VERIFIED";
    NotificationType["ACCOUNT_LOCKED"] = "ACCOUNT_LOCKED";
    NotificationType["ACCOUNT_UNLOCKED"] = "ACCOUNT_UNLOCKED";
    NotificationType["NEW_FOLLOWER"] = "NEW_FOLLOWER";
    NotificationType["NEW_COMMENT"] = "NEW_COMMENT";
    NotificationType["NEW_SPONSOR"] = "NEW_SPONSOR";
    NotificationType["NEW_DONATION"] = "NEW_DONATION";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
var NotificationStatus;
(function (NotificationStatus) {
    NotificationStatus["READ"] = "READ";
    NotificationStatus["UNREAD"] = "UNREAD";
})(NotificationStatus || (exports.NotificationStatus = NotificationStatus = {}));
