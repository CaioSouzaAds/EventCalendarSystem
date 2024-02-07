import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControlOptions,
} from '@angular/forms';
import { ValidatorField } from '../../../helpers/ValidatorField';
import { AccountService } from '../../../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { UserRegister } from '../../../models/identity/UserRegister';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toastService: ToastrService
  ) {}

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
        agreeTerms: [false, [Validators.requiredTrue]],
      },
      formOptions
    );
  }

  get f(): any {
    return this.form.controls;
  }

  submitForm(): void {
    if (!this.form.valid) {
      this.toastService.error(
        'Formulário inválido. Por favor, verifique os campos.'
      );
      return;
    }

    const registrationData: UserRegister = {
      name: this.f.firstName.value,
      email: this.f.email.value,
      password: this.f.password.value,
      role: 'USER',
    };

    this.accountService.register(registrationData).subscribe({
      next: () => {
        this.toastService.success(
          'Registro bem-sucedido! Por favor, faça login.'
        );
        this.form.reset();
        this.router.navigateByUrl('/user/login');
      },
      error: (error) => {
        const errorMessage =
          error.status === 409
            ? 'Erro: O e-mail fornecido já está em uso.'
            : error.error?.message || 'Erro no registro. Verifique os campos.';
        this.toastService.error(errorMessage);
      },
    });
  }
}
