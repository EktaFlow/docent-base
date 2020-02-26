import { Injectable } from "@angular/core";
import { HttpInterceptor,
				 HttpRequest,
				 HttpHandler,
				 HttpEvent } from "@angular/common/http";

import { Observable } from "rxjs";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>,
		next: HttpHandler): Observable<HttpEvent<any>> {

			//check network status
			//if online continue with code below && set var in local storage to online 
			//if offline set var in local storage - break out of intercept function (by returning null)
			//

				var token = localStorage.getItem("docent-token")
				token = JSON.parse(token)

				if (token) {
					var clonedRequest = req.clone({
					headers: req.headers.set("Authorization", "Bearer " + (<any>token).jwt)
						});

					return next.handle(clonedRequest);
				}

				else {
					return next.handle(req);
				}
		}
}
