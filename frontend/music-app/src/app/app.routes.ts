import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './common-ui/header/header.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { canActivateAuth } from './auth/access.guard';
import { FooterComponent } from './common-ui/footer/footer.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';

export const routes: Routes = [
    {
        path: '',
        component: HeaderComponent,
        children: [
            {
                path: '',
                component: HomePageComponent
            },
            {
                path: 'login',
                component: LoginPageComponent
            },
            {
                path: 'register',
                component: RegistrationPageComponent //TODO: Remove this placeholder and change it actual register page
            },
            {
                path: 'profile',
                component: ProfilePageComponent,
                //canActivate: [canActivateAuth]
            }
        ]
    },
    // {
    //     path: 'profile',
    //     component: ProfilePageComponent,
    //     //canActivate: [canActivateAuth]
    // }
];
