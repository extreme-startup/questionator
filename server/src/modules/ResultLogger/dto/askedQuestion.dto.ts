export class AskedQuestionDto {
  readonly id: string;
  readonly contestContenderId: number;
  readonly questionId: string;
  readonly generatedQuestion: string;
  readonly generatedAnswer: string;
  readonly askedOn: Date;
  readonly answeredOn: Date;
  readonly answer: string;
  readonly score: number;
  readonly isCorrect: boolean;
}
