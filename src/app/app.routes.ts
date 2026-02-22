import { Routes } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ArticleListComponent } from '../article-list/article-list.component';
import { AddArticleComponent } from '../add-article/add-article.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { HomeComponent } from './home/home.component';
import { UserArticleComponent } from '../user-article/user-article.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "articles",
        component: ArticleListComponent
    },
    {
        path: "addArticle",
        component: AddArticleComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "profile",
        component: UserArticleComponent
    }
];
