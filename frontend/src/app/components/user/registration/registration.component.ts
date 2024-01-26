import { Component, OnInit } from '@angular/core';
import { ValidatorField } from '../../../helpers/ValidatorField';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'confirmPassword'),
    };

    this.form = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      formOptions
    );
  }

  get f(): any {
    return this.form.controls;
  }

  submitForm(): void {
    if (this.form.valid) {
      console.log('Formulário válido. Dados enviados:', this.form.value);
    } else {
      console.log('Formulário inválido. Por favor, verifique os campos.');
    }
  }
}
