import { Country } from "../shared";

export interface Contact {
  id: string;
  country: Country;
  phoneNumber: string;
  address: string;
}
