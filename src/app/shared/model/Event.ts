import { EventType } from 'src/app/shared/model/EventType';
export interface Event {
  id: number;
  active: boolean;
  order: number;
  parameter: string;
  screenId: number;
  eventTypeId: number;
}

export interface EventHandler {
  id: number;
  active: boolean;
  order: number;
  parameter: string;
  screenId: number;
  eventTypeId: number;
  eventType?: EventType
}
