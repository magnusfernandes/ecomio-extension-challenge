export class Trip {
  public vendor: 1 | 2;
  public origin: string;
  public destination: string;
  public start: string;
  public end: string;
  public sustainabilityScore: number;

  constructor(data: any) {
    this.vendor = data.vendor != null ? data.vendor : null;
    this.origin = data.origin != null ? data.origin.toUpperCase() : null;
    this.destination = data.destination != null ? data.destination.toUpperCase() : null;
    this.start = data.start != null ? data.start : null;
    this.end = data.end != null ? data.end : null;
    this.sustainabilityScore = data.sustainability_score != null ? data.sustainability_score : null;
  }
}

export interface TripResponse {
  trips: Trip[];
}
