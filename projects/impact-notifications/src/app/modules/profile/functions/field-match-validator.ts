import { AbstractControl } from "@angular/forms";


export function fieldMatchValidator(control: AbstractControl) {
  const { password, passwordConfirm } = control.value;

  // avoid displaying the message error when values are empty
  if (!passwordConfirm || !password) {
    return null;
  }

  if (passwordConfirm === password) {
    return null;
  }

  return {
    fieldMatch: {
      label: 'form.validation.fieldMatch'
    },
  };
}





