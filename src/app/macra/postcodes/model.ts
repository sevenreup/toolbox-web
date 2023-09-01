export interface PostGroup {
  name: string;
  codes: Postcode[]
}

export interface Postcode {
  code: string;
  name: string;
  group: string;
}

