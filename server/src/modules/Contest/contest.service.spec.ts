import { Repository } from 'typeorm';

import { Contest } from '../../entity/Contest';
import { ContestDto } from './contest.dto';
import { ContestService } from './contest.service';
import {
  contestDto,
  updateResult,
  deleteResult,
  insertResult,
  MockRepository,
} from './__mocks__/mocks';
import { RoundService } from '../ContestSession/round.service';
import { UserService } from '../User/user.service';

describe('ContestService', () => {
  const contestId = '1f941f0d-ab27-45ed-ba6a-72e68069dbfa';
  const contest = new Contest();
  let contestService: ContestService;
  let contestRepository: Repository<Contest>;

  beforeEach(async () => {
    contestRepository = new MockRepository();
    contestService = new ContestService(
      contestRepository,
      new MockRepository(),
      new RoundService(new MockRepository()),
      new UserService(new MockRepository()),
      new MockRepository(),
    );
  });

  describe('findOne', () => {
    it('should get consent by id from contest repository', async () => {
      jest
        .spyOn(contestRepository, 'findOne')
        .mockReturnValue(Promise.resolve(contest));

      expect(await contestService.findOne(contestId)).toBe(contest);
      expect(contestRepository.findOne).toHaveBeenCalledWith(contestId);
    });
  });

  describe('findAll', () => {
    it('should get all consents from consent repository', async () => {
      const returnConsents: Contest[] = [contest];
      jest
        .spyOn(contestRepository, 'find')
        .mockReturnValue(Promise.resolve(returnConsents));

      expect(await contestService.findAll()).toEqual(returnConsents);
      expect(contestRepository.find).toHaveBeenCalledWith();
    });

    it('should return only not deleted contests', async () => {
      const regularContest = new Contest();
      regularContest.isDeleted = false;
      const deletedContest = new Contest();
      deletedContest.isDeleted = true;

      const returnContests: Contest[] = [regularContest, deletedContest];
      const expectedContests: Contest[] = [regularContest];

      jest
          .spyOn(contestRepository, 'find')
          .mockReturnValue(Promise.resolve(returnContests));

      expect(await contestService.findAll()).toEqual(expectedContests);
    });
  });

  describe('create', () => {
    it('should create new contest', async () => {
      const newContestDto: ContestDto = contestDto;
      const userId = '1';
      jest
        .spyOn(contestRepository, 'save')
        .mockReturnValue(Promise.resolve(contest));
      jest.spyOn(contestRepository, 'create').mockReturnValue(contest);

      expect(await contestService.create({...newContestDto, userId})).toMatchObject(contest);
      expect(contestRepository.create).toHaveBeenCalledWith(expect.objectContaining(newContestDto));
      expect(contestRepository.save).toHaveBeenCalledWith(contest);
    });
  });

  describe('update', () => {
    it('should update existing contest by id', async () => {
      const updateContestDto: ContestDto = contestDto;
      jest
        .spyOn(contestRepository, 'update')
        .mockReturnValue(Promise.resolve(updateResult));

      expect(await contestService.update(contestId, updateContestDto)).toBe(
        updateResult,
      );
      expect(contestRepository.update).toHaveBeenCalledWith(
        contestId,
        updateContestDto,
      );
    });
  });

  describe('delete', () => {
    it('should delete contest by id', async () => {
      jest
        .spyOn(contestRepository, 'delete')
        .mockReturnValue(Promise.resolve(deleteResult));

      expect(await contestService.delete(contestId)).toBe(deleteResult);
      expect(contestRepository.delete).toHaveBeenCalledWith(contestId);
    });
  });

  // TODO: FIX ME
  // describe('findAllQuestions', () => {
  //   it('should filter deleted questions', async () => {

  //     const contestWithQs = new Contest();

  //     const q1 = new Question();
  //     const q2 = new Question();
  //     q1.isDeleted = false;
  //     q2.isDeleted = true;

  //     contestWithQs.questions = [q1, q2];

  //     jest
  //       .spyOn(contestRepository, 'findOne')
  //       .mockReturnValue(Promise.resolve(contestWithQs));

  //     expect(await contestService.findAllQuestions(contestId)).toEqual([q1]);
  //   });
  // });
});
