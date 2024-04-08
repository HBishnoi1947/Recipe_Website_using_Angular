import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Observable, exhaustMap, take } from "rxjs";

// this class takes the request sent to the firebase then adds the token (token is recieved after login-in) required to access the firebase
@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.user.pipe(
            take(1),  // used by BehaviourSubject
            exhaustMap(user => {
                if(!user){  // for login and signup request token is not needed
                    return next.handle(req);
                }
                const modifiedReq = req.clone({params: new HttpParams().set('auth',user.token)})
                return next.handle(modifiedReq);
            })
        )
    }
}



// Http.get<Recipe[]>('http://ng-xyz....../recipe.json');   // this http request automatically goes through the interceptor and token is added automatically