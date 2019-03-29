import { validateCompetitionDetails } from '../competition-details-validation';

describe('CompetitionDetailsValidation', () => {
  describe('validateCompetitionDetails', () => {
    let sut;

    let initialCompetitionDetails;

    beforeEach(() => {
      sut = validateCompetitionDetails;
      initialCompetitionDetails = { name: 'test', description: 'some description' };
    });

    describe('when name changed', () => {
      it('should be able to save', () => {
        const competitionDetails = { name: 'test changed', description: 'some description' };
        const expectedResult = {
          canBeSaved: true,
          errors: { nameRequired: false, descriptionRequired: false },
        };

        expect(sut(competitionDetails, initialCompetitionDetails)).toEqual(expectedResult);
      });
    });

    describe('when description changed', () => {
      it('should be able to save', () => {
        const competitionDetails = { name: 'test', description: 'some description plus something' };
        const expectedResult = {
          canBeSaved: true,
          errors: { nameRequired: false, descriptionRequired: false },
        };

        expect(sut(competitionDetails, initialCompetitionDetails)).toEqual(expectedResult);
      });
    });

    describe('when name and description changed', () => {
      it('should be able to save', () => {
        const competitionDetails = {
          name: 'test changed',
          description: 'some description plus something',
        };
        const expectedResult = {
          canBeSaved: true,
          errors: { nameRequired: false, descriptionRequired: false },
        };

        expect(sut(competitionDetails, initialCompetitionDetails)).toEqual(expectedResult);
      });
    });

    describe('when name is empty', () => {
      it('should not be able to save', () => {
        const competitionDetails = { name: '', description: 'some description' };
        const expectedResult = {
          canBeSaved: false,
          errors: { nameRequired: true, descriptionRequired: false },
        };

        expect(sut(competitionDetails, initialCompetitionDetails)).toEqual(expectedResult);
      });
    });

    describe('when description is empty', () => {
      it('should not be able to save', () => {
        const competitionDetails = { name: 'test', description: '' };
        const expectedResult = {
          canBeSaved: false,
          errors: { nameRequired: false, descriptionRequired: true },
        };

        expect(sut(competitionDetails, initialCompetitionDetails)).toEqual(expectedResult);
      });
    });

    describe('when nothing changed', () => {
      it('should not be able to save', () => {
        const competitionDetails = { name: 'test', description: 'some description' };
        const expectedResult = {
          canBeSaved: false,
          errors: { nameRequired: false, descriptionRequired: false },
        };

        expect(sut(competitionDetails, initialCompetitionDetails)).toEqual(expectedResult);
      });
    });

    describe('when everything is empty', () => {
      it('should not be able to save', () => {
        const competitionDetails = { name: '', description: '' };
        const expectedResult = {
          canBeSaved: false,
          errors: { nameRequired: true, descriptionRequired: true },
        };

        expect(sut(competitionDetails, initialCompetitionDetails)).toEqual(expectedResult);
      });
    });
  });
});
