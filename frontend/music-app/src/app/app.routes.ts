import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './common-ui/header/header.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

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
            }
        ]
    }
];
