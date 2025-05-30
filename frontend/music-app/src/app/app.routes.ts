import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './common-ui/header/header.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { canActivateAuth } from './auth/access.guard';
import { FooterComponent } from './common-ui/footer/footer.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { AlbumPackPageComponent } from './pages/album-pack-page/album-pack-page.component';
import { PublicProfilesPageComponent } from './pages/public-profiles-page/public-profiles-page.component';
import { PublicProfileDetailsPageComponent } from './pages/public-profile-details-page/public-profile-details-page.component';
import { PasswordChangePageComponent } from './pages/password-change-page/password-change-page.component';

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
                component: RegistrationPageComponent 
            },
            {
                path: 'search', 
                component: SearchPageComponent,
                canActivate: [canActivateAuth]
            },
            {
                path: 'profile',
                component: ProfilePageComponent,
                canActivate: [canActivateAuth]
            },
            {
                path: 'packs/:id',
                component: AlbumPackPageComponent,
                canActivate: [canActivateAuth]
            },
            {
                path: 'albums/:id',
                component: DetailsPageComponent,
                canActivate: [canActivateAuth]
            },
            {
                path: 'public-profiles',
                component: PublicProfilesPageComponent,
                canActivate: [canActivateAuth]
            },
            {
                path: 'public-profiles/:id',
                component: PublicProfileDetailsPageComponent,
                canActivate: [canActivateAuth]
            },
            {
                path: 'password-change',
                component: PasswordChangePageComponent,
                canActivate: [canActivateAuth]
            },
            {
                path: '**',
                component: PageNotFoundComponent
            }
        ]
    },
    // {
    //     path: 'profile',
    //     component: ProfilePageComponent,
    //     //canActivate: [canActivateAuth]
    // }
];
