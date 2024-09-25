import { VentureEvent } from "./event";

export interface EventCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  events: VentureEvent[];
}
