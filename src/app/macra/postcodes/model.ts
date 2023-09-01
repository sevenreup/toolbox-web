export interface PostGroup {
  name: string;
  codes: Postcode[];
  region: "central" | "south" | "north";
}

export interface Postcode {
  code: string;
  name: string;
  group: string;
}

export interface PostCodeData {
  name: string;
  code: string;
  region: string;
  group: string;
}