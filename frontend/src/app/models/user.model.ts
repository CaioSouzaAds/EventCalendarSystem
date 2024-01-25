export interface Event {
  id: number;
  eventName: string;
  startDate: string;
  endDate: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  events: Event[];
}
