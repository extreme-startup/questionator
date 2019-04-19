export class AskedQuestionDto {
  readonly id: string;
  readonly contestContenderId: string;
  readonly questionId: string;
  readonly question: string;
  readonly answer: string;
  readonly askedOn: Date;
  readonly answeredOn: Date;
  readonly score: number;
  readonly isCorrect: boolean;
  readonly session: any;
}
