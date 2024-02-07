import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { UserLogin } from './../../../models/identity/UserLogin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  model = {} as UserLogin;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  login(): void {
    this.accountService.login(this.model).subscribe({
      next: () => {
        this.toastr.success('Login realizado com sucesso!');
        this.router.navigateByUrl('/dashboard');
      },
      error: (error) => {
        const errorMessage =
          error.status === 403
            ? 'Usuário ou senha inválidos'
            : error.status === 404
            ? 'Usuário não encontrado'
            : 'Ocorreu um erro durante o login';
        this.toastr.error(errorMessage);
        if (error.status !== 403 && error.status !== 404) {
          console.error('Erro no login:', error);
        }
      },
    });
  }
}
