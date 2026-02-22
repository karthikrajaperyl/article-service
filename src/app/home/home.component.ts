import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { Observable } from 'rxjs';
import { ArticleListComponent } from '../../article-list/article-list.component';
import { UserArticleComponent } from '../../user-article/user-article.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ArticleListComponent, UserArticleComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }
}
