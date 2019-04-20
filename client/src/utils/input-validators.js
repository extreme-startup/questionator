export const getIsRequiredValidator = ({ inputName }) => value => {
  return !!value || `${inputName} is required`;
};

export const getLengthValidator = ({ inputName, length }) => value => {
  return value.length <= length || `${inputName} must be less than ${length} characters`;
};

export const emailValidator = value => /.+@.+/.test(value) || 'E-mail must be valid';
