export interface IRateLimit {
  secondsWindow: number;
  allowedHits: number;
  originalUrl: string;
}
