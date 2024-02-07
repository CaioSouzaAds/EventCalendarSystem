import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Excluindo as rotas de registro e login da adição do cabeçalho de autorização
    if (req.url.endsWith('/auth/register') || req.url.endsWith('/auth/login')) {
      return next.handle(req);
    }

    const token = localStorage.getItem('token'); // Lê o token do localStorage
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req);
  }
}
