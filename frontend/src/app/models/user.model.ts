import { EventData } from './eventData.model';

export interface User {
  id: number;
  name: string;
  email: string;
  events: EventData[];
}
