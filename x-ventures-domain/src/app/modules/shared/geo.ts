export interface Location {
  lat: number;
  lng: number;
  description?: string;
}

export interface Country {
  id: number;
  name: string;
  code: string;
  currency: Currency;
  phoneCode: string;
  flag: string;
}

export interface Currency {
  id: number;
  name: string;
  code: string;
  symbol: string;
}

export interface Department {
  id: number;
  name: string;
  municipalities: Municipality[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Municipality {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
