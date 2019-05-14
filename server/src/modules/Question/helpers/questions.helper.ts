import { Question } from '../../../entity/Question';
import { QuestionDto } from '../dto/question.dto';

export function toQuestionDto(question: Question): QuestionDto {
  return {
    id: question && question.id,
    type: question && question.type,
    text: question && question.text,
    answer: question && question.answer,
    value: question && question.value,
    isDeleted: question && question.deleted,
    contextGenerator: question && question.contextGenerator,
  };
}
