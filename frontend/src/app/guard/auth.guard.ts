import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const toastService = inject(ToastrService); // Obtém a instância do ToastService
  const user = localStorage.getItem('user');

  if (user) {
    return true;
  } else {
    // Usuário não está logado, exibe mensagem e nega acesso
    toastService.show('É necessário estar logado para acessar esta página.');
    const router = inject(Router);
    router.navigate(['/user/login']); // Redireciona para a página de login
    return false;
  }
};
