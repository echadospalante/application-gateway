import { Sponsorship } from "../donations/sponsor";
import { Publication } from "../feeds/publication";
import { Subscription } from "./subscription";
import { Venture } from "./venture";
import { VentureEvent } from "../feeds/event";
export interface VentureDetail {
    id: number;
    venture: Venture;
    events: VentureEvent[];
    sponsorships: Sponsorship[];
    subscriptions: Subscription[];
    publications: Publication[];
}
