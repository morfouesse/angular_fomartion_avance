import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from "../shared/services/auth.service";

//Un intercepteur HTTP intercepte toutes les requêtes HTTP envoyées par votre application pour
// effectuer des tâches requises, comme l'ajout d'un header d'autorisation.

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  // La méthode  intercept()  clone la requête reçue en ajoutant les modifications requises au clone.
  //
  // intercept()  passe ensuite la nouvelle requête à  next.handle()  pour lui permettre de continuer son chemin.
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders()
      .append('Authorization', `Bearer ${this.authService.getToken()}`);
    const modifiedReq = req.clone({headers});
    return next.handle(modifiedReq);
  }
}
