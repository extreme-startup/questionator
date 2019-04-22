
export class AskedQuestionDto {
  readonly id: string;
  readonly contestPlayerId: string;
  readonly question: any;
  readonly text: string;
  readonly answer: string;
  readonly askedOn: Date;
  readonly answeredOn: Date;
  readonly score: number;
  readonly isCorrect: boolean;
  readonly contestSession: any;
  readonly player: any;
}
