export default class VentureCreateDto {
  name: string;
  description: string;
  categoriesIds: string[];
  contactEmail: string;
  contactPhoneNumber: string;
  locationLat: number;
  locationLng: number;
  locationDescription: string;
}
