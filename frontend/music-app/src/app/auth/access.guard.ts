import { inject } from "@angular/core";
import { AuthService } from "./auth.service"
import { CanActivateFn, Router, UrlTree } from "@angular/router";

export const canActivateAuth : CanActivateFn = () => {
    const authService = inject(AuthService);

    if (authService.isAuthenticated()) {
        return true;
    }

    inject(Router).navigate(['/login']);
    return false;

}
