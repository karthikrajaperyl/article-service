import { Component } from '@angular/core';
import { ArticleListComponent } from '../article-list/article-list.component';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { User } from '../model/User';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserArticleComponent } from '../user-article/user-article.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn$: Observable<boolean>;
  userName: string | null = null;
  isContributor: boolean = false;
  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }
  ngOnInit(): void {

    console.log("Header Component ngOnInit");
    // Subscribe to login status changes to fetch user details
    this.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        const user = this.authService.getUserDetails(); // Assumes this fetches user from storage/API
        if (user) {
          this.userName = user.username;
          // Check if the user has the role required to post an article
          this.isContributor = user.role === 'admin';
        }
      } else {
        this.userName = null;
        this.isContributor = false;
      }
    });
  }


  logout(): void {
    this.authService.logout();
  }
}
