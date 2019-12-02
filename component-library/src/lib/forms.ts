export type FormikErrors<Fields> = Partial<{ [K in keyof Fields]: string }>;

export type FieldValidator<Fields> = (
  values: Fields,
  existingErrors: FormikErrors<Fields>
) => FormikErrors<Fields>;

export const composeValidators = <Fields extends {}>(
  values: Fields,
  initialErrors: FormikErrors<Fields>,
  ...validators: Array<FieldValidator<Fields>>
): FormikErrors<Fields> => {
  let errors = initialErrors;
  validators.forEach(validator => {
    errors = validator(values, errors);
  });
  return errors;
};

export const academicInfoValidator = (satKey: string, actKey: string, psatKey: string): FieldValidator<any> => (values, errors) => {
  if (!values[satKey] && !values[actKey] && !values[psatKey]) {
    errors[satKey] = 'Please provide an SAT, PSAT or ACT score.'
  }
  return errors
}

export const commonValidations = {
  act: (actKey: string): FieldValidator<any> => (values, errors) => {
    if (!values[actKey]) {
      return errors;
    }
    if (values[actKey] < 10) {
      errors[actKey] = 'ACT score must be over 10.';
    }
    if (values[actKey] > 36) {
      errors[actKey] = 'ACT score must be below 36.';
    }
    return errors;
  },
  emailAddress: (emailAddressKey: string): FieldValidator<any> => (values, errors) => {
    if (!values[emailAddressKey]) {
      errors[emailAddressKey] = 'Enter your email address.';
    }
    if (values[emailAddressKey] && values[emailAddressKey].length < 4) {
      errors[emailAddressKey] = 'Enter a valid email address.';
    }
    return errors;
  },
  firstName: (firstNameKey: string): FieldValidator<any> => (values, errors) => {
    if (!values[firstNameKey]) {
      errors[firstNameKey] = 'Enter your first name.';
    }
    if (values[firstNameKey] && values[firstNameKey].length < 2) {
      errors[firstNameKey] = 'Enter your first name.';
    }
    return errors;
  },
  lastName: (lastNameKey: string): FieldValidator<any> => (values, errors) => {
    if (!values[lastNameKey]) {
      errors[lastNameKey] = 'Enter your last name.';
    }
    if (values[lastNameKey] && values[lastNameKey].length < 2) {
      errors[lastNameKey] = 'Enter your last name.';
    }
    return errors;
  },
  password: (passwordKey: string): FieldValidator<any> => (values, errors) => {
    if (!values[passwordKey]) {
      errors[passwordKey] = 'Enter a password.';
    }
    if (values[passwordKey] && values[passwordKey].length < 6) {
      errors[passwordKey] = "Enter a password that's at least six characters.";
    }
    return errors;
  },
  sat: (satKey: string): FieldValidator<any> => (values, errors) => {
    if (!values[satKey]) {
      return errors;
    }
    if (values[satKey] % 10 !== 0) {
      errors[satKey] = 'SAT score must be a multiple of 10.';
    }
    if (values[satKey] < 400) {
      errors[satKey] = 'SAT score must be over 400.';
    }
    if (values[satKey] > 1600) {
      errors[satKey] = 'SAT score must be below 1600.';
    }
    return errors;
  },
  psat: (psatKey: string): FieldValidator<any> => (values, errors) => {
    if (!values[psatKey]) {
      return errors;
    }
    if (values[psatKey] % 10 !== 0) {
      errors[psatKey] = 'PSAT score must be a multiple of 10.';
    }
    if (values[psatKey] < 320) {
      errors[psatKey] = 'PSAT score must be over 320.';
    }
    if (values[psatKey] > 1520) {
      errors[psatKey] = 'PSAT score must be below 1520.';
    }
    return errors;
  }
};
