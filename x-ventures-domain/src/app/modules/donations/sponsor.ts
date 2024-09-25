import { User } from "../auth";
import { Venture } from "../ventures/venture";

export interface Sponsorship {
  id: string;
  sponsor: User;
  venture: Venture;
  monthlyAmount: number;
  createdAt: Date;
}
