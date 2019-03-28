import { Repository } from 'typeorm';
jest.mock('typeorm');

export const contestDto = {
  name: 'contest name',
  description: 'contest description',
  category: 'contest category',
};

export const updateResult = {
  generatedMaps: [],
  raw: {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    serverStatus: 2,
    warningCount: 0,
    message: '(Rows matched: 1  Changed: 0  Warnings: 0',
    protocol41: true,
    changedRows: 0,
  },
};

export const deleteResult = {
  raw: {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    serverStatus: 2,
    warningCount: 0,
    message: '',
    protocol41: true,
    changedRows: 0,
  },
  affected: 1,
};

export const insertResult = {
  identifiers: [
    {
      id: 5,
    },
  ],
  generatedMaps: [
    {
      id: 5,
    },
  ],
  raw: {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 5,
    serverStatus: 2,
    warningCount: 2,
    message: '',
    protocol41: true,
    changedRows: 0,
  },
};

export const MockRepository = Repository;
