export class QuestionDto {
    readonly type: string;
    readonly text: string;
    readonly answer: string;
    readonly value: string;
    readonly isDeleted: boolean;
    readonly contestId: number;
}
