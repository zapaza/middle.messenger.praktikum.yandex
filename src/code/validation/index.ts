import {FIELDS_PATTERN, VALIDATE_TYPES} from "../dictionary/dictionary";
import {IValidationOptions} from "../types";

function checkingRegExp(value: string | undefined, options?: IValidationOptions, pattern?: string): string[]{
    const errors: string[] = [];

    if (!value) {
        if ( options && options.isRequired ) {
            errors.push('Обязательное поле!');
        }

    } else {
        if (options && options.min && options.max) {
            if ( value.length < options.min || value.length > options.max) {
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

export function validate(type: VALIDATE_TYPES, value: string, isRequired =  false,  repeatValue?: string) {

    if (type === VALIDATE_TYPES.LOGIN) {
        return checkingRegExp(value, { min: 3, max: 20, isRequired: isRequired }, FIELDS_PATTERN.LOGIN);
    } else if (type === VALIDATE_TYPES.EMAIL) {
        return checkingRegExp(value, { isRequired: isRequired }, FIELDS_PATTERN.EMAIL);
    } else if (type === VALIDATE_TYPES.PHONE_NUMBER) {
        return checkingRegExp(value, { min: 10, max:15, isRequired: isRequired }, FIELDS_PATTERN.PHONE);
    } else if (type === VALIDATE_TYPES.FIRST_NAME) {
        return checkingRegExp(value, { isRequired: isRequired }, FIELDS_PATTERN.NAME);
    } else if (type === VALIDATE_TYPES.SECOND_NAME) {
        return checkingRegExp(value, { isRequired: isRequired }, FIELDS_PATTERN.NAME);
    } else if (type === VALIDATE_TYPES.PASSWORD) {
        return checkingRegExp(value, { min: 8, max: 40, isRequired: isRequired}, FIELDS_PATTERN.PASSWORD);
    } else if (type === VALIDATE_TYPES.REPEAT_PASSWORD) {
        return checkingRegExp(value, {repeatedValue: repeatValue, isRequired: isRequired});
    } else if (type === VALIDATE_TYPES.MESSAGE) {
        return checkingRegExp(value);
    }
}
