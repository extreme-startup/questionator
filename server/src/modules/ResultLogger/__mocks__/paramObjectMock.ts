import {Equal, MoreThan, Not} from 'typeorm';
import * as dateFormat from 'dateformat';

const MoreThanDate = (date: Date) => MoreThan(dateFormat(date, 'yyyy-mm-dd HH:MM:ss'));

export const paramObjectMock = {
  order: {
    answeredOn: 'ASC',
  },
  select: [
    'contestContenderId',
    'score',
    'answeredOn',
  ],
  where: {
    sessionId: 2,
    answeredOn: MoreThanDate(new Date(null)) && Not(Equal(0)),
  },
};
