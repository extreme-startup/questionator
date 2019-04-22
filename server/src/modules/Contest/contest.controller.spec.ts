import { ContestController } from './contest.controller';
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

jest.mock('./contest.service');
jest.mock('../../entity/Contest');

describe('ContestController', () => {
  const contestId = '1f941f0d-ab27-45ed-ba6a-72e68069dbfa';
  const contest = new Contest();
  let contestController: ContestController;
  let contestService: ContestService;

  beforeEach(async () => {
    contestService = new ContestService(new MockRepository());
    contestController = new ContestController(contestService);
  });

  describe('create', () => {
    it('should create contest', async () => {
      const createContestDto: ContestDto = contestDto;

      jest
        .spyOn(contestService, 'create')
        .mockReturnValue(Promise.resolve(insertResult));

      expect(await contestController.create(createContestDto)).toBe(
        insertResult,
      );
      expect(contestService.create).toHaveBeenCalledWith(createContestDto);
    });
  });

  describe('findOne', () => {
    it('should return contest by id', async () => {
      jest
        .spyOn(contestService, 'findOne')
        .mockReturnValue(Promise.resolve(contest));

      expect(await contestController.findOne(contestId)).toBe(contest);
      expect(contestService.findOne).toHaveBeenCalledWith(contestId);
    });
  });

  describe('findAll', () => {
    it('should return all contests', async () => {
      const contestsResult: Contest[] = [contest];

      jest
        .spyOn(contestService, 'findAll')
        .mockReturnValue(Promise.resolve(contestsResult));

      expect(await contestController.findAll()).toBe(contestsResult);
      expect(contestService.findAll).toHaveBeenCalledWith();
    });
  });

  describe('update', () => {
    it('should update contest by id', async () => {
      const updateParams: ContestDto = contestDto;

      jest
        .spyOn(contestService, 'update')
        .mockReturnValue(Promise.resolve(updateResult));

      expect(await contestController.update(contestId, updateParams)).toBe(
        updateResult,
      );
      expect(contestService.update).toHaveBeenCalledWith(
        contestId,
        updateParams,
      );
    });
  });

  describe('delete', () => {
    it('should delete contest by id', async () => {
      jest
        .spyOn(contestService, 'delete')
        .mockReturnValue(Promise.resolve(deleteResult));

      expect(await contestController.delete(contestId)).toBe(deleteResult);
      expect(contestService.delete).toHaveBeenCalledWith(contestId);
    });
  });
});
