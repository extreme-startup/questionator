import { getIsRequiredValidator, getLengthValidator, emailValidator } from '../input-validators';

describe('input-validators', () => {
  const inputName = 'testInputName';

  describe('getIsRequiredValidator', () => {
    const isRequiredValidator = getIsRequiredValidator({ inputName: inputName });

    it('should return true when there is not empty value', () => {
      expect(isRequiredValidator('someValue')).toBe(true);
    });

    it('should return validation error when there is no value', () => {
      expect(isRequiredValidator('')).toBe(`${inputName} is required`);
    });
  });

  describe('getLengthValidator', () => {
    const maxInputLength = 15;
    const lengthValidator = getLengthValidator({
      inputName: inputName,
      length: maxInputLength,
    });

    it('should return true when input length is less then max length', () => {
      expect(lengthValidator('testInput')).toBe(true);
    });

    it('should return validation error message when length is longer then max lenght', () => {
      expect(lengthValidator('someLongLongString')).toBe(
        `${inputName} must be less than ${maxInputLength} characters`,
      );
    });
  });

  describe('emailValidator', () => {
    it('should return true for valid email', () => {
      expect(emailValidator('test@test.com')).toBe(true);
    });

    it('should return error message for invalid email', () => {
      expect(emailValidator('invalidEmail')).toBe('E-mail must be valid');
    });
  });
});
