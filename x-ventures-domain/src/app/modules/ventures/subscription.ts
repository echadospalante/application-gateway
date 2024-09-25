import { User } from "../auth";
import { Venture } from "./venture";

export interface Subscription {
  id: string;
  subscriber: User;
  venture: Venture;
  createdAt: Date;
}
