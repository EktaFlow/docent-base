import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { AuthInterceptor } from "./auth-interceptor.service";

export const httpInterceptorsProviders = [
	{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
]
