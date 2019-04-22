import { Question } from '../../../entity/Question';
import { QuestionDto } from '../dto/question.dto';

export function toQuestionDto(question: Question): QuestionDto {
  return {
    type: question && question.type,
    text: question && question.text,
    answer: question && question.answer,
    value: question && question.value,
    isDeleted: question && question.deleted,
  };
}
