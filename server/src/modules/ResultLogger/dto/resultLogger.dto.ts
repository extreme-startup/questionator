export class ResultLoggerDto {
  readonly labels: [number];
  readonly users: {
    name: string,
    scores: [number],
  };
}
