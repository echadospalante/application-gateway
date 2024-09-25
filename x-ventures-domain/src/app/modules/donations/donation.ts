import { User } from "../auth";
import { Venture } from "../ventures/venture";

export interface Donation {
  id: string;
  donor: User;
  venture: Venture;
  createdAt: Date;
}
