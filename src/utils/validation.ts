import {IInputProps, IValidationOptions} from '../code/types';
import {FIELDS_PATTERN, VALIDATE_TYPES} from '../code/dictionary/dictionary';
import {Block} from '../code/base/Block';

function checkingRegExp(value: string | undefined, options?: IValidationOptions, pattern?: string): string[] {
  const errors: string[] = [];

  if (!value) {
    if (options && options.isRequired) {
      errors.push('Обязательное поле!');
    }

  } else {
    if (options && options.min && options.max) {
      if (value.length < options.min || value.length > options.max) {
        errors.push(`Введенное значение должно быть от ${options.min} до ${options.max} знаков`);
      }
    }

    if (options && options.repeatedValue && options.repeatedValue !== value) {
      errors.push('Поля не совпадают!');
    }


    if (pattern && value) {
      const reqExp = new RegExp(pattern);

      if (!reqExp.test(value)) {
        errors.push('Неправильный формат!');
      }
    }
  }

  return errors;
}

export function validate(type: VALIDATE_TYPES, value: string | undefined, isRequired = false) {
  if (type === VALIDATE_TYPES.login) {
    return checkingRegExp(value, {min: 3, max: 20, isRequired: isRequired}, FIELDS_PATTERN.LOGIN);
  } else if (type === VALIDATE_TYPES.email) {
    return checkingRegExp(value, {isRequired: isRequired}, FIELDS_PATTERN.EMAIL);
  } else if (type === VALIDATE_TYPES.phone) {
    return checkingRegExp(value, {min: 10, max: 15, isRequired: isRequired}, FIELDS_PATTERN.PHONE);
  } else if (type === VALIDATE_TYPES.first_name) {
    return checkingRegExp(value, {isRequired: isRequired}, FIELDS_PATTERN.NAME);
  } else if (type === VALIDATE_TYPES.second_name) {
    return checkingRegExp(value, {isRequired: isRequired}, FIELDS_PATTERN.NAME);
  } else if (type === VALIDATE_TYPES.password) {
    return checkingRegExp(value, {min: 8, max: 40, isRequired: isRequired}, FIELDS_PATTERN.PASSWORD);
  } else if (type === VALIDATE_TYPES.message) {
    return checkingRegExp(value);
  }
}

export function validateForm(filds: Block<IInputProps>[]) {
  const errors = [];
  filds.forEach((input) => {
    if (input.props.validateType) {
      const error = validate(
        input.props.validateType as VALIDATE_TYPES,
        input.props.value,
        input.props.required,
      );

      if (error && error.length > 0) {
        errors.push(error);
      }
    }
  });

  return errors.length > 0;
}
