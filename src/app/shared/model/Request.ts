export interface Request {
  id?: number;
  uri_homolog : string;
  eventId: number;
  requestFatherId?: number;
  uri_prod: string;
  description: string;
  layer: string;
  status: boolean;
  order: number;
}
