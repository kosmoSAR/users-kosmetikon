import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";


export const LoginGuardian = () => {
  const cookies = inject(CookieService);
  const router = inject(Router)
  if (cookies.get('access_token')) {
    return true;
  } else {
    router.navigate(['login'])
    return false;
  }
}
