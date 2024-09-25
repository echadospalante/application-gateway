import { Donation } from "../donations";
import { Location } from "../shared/geo";
import { EventCategory } from "./category";
export interface VentureEvent {
    id: string;
    title: string;
    description: string;
    coverPhoto: string;
    location: Location;
    categories: EventCategory[];
    donations: Donation[];
    startDate: Date;
    endDate: Date;
    createdAt: Date;
}
