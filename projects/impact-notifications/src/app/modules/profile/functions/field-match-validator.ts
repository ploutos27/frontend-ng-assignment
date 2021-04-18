import { AbstractControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";

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
      message: 'permissions.name | translate',
    },
  };
}





