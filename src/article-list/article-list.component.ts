import { Component, OnInit } from '@angular/core';
import { ArticleServiceService } from '../app/article-service.service';
import { AuthService } from '../service/auth.service';
import { Article } from '../model/Article';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-article-list',
  imports: [NgFor, NgIf],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css'
})
export class ArticleListComponent implements OnInit {
  articleList: Article[] = [];
  constructor(private articleService: ArticleServiceService, private authService: AuthService) { }

  ngOnInit(): void {

    console.log('Fetching articles list...');


    this.authService.isLoggedIn.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        const user = this.authService.getUserDetails();
        if (user) {
          this.getArticleList(user.toString());
        } else {
          this.getArticleList();
        }
      } else {
        this.getArticleList();
      }
    });
  }

  getArticleList(userId?: string): void {
    if (userId) {
      // Assuming articleService has a method for user-specific articles
      this.articleService.getUserSpecificArticleShortService(userId).subscribe({
        next: (articleList: Article[]) => this.articleList = articleList,
        error: (err) => console.error('Error fetching user-specific articles:', err)
      });
    } else {
      // Fetch public articles
      this.articleService.getPublicArticleShortService().subscribe({
        next: (articleList: Article[]) => this.articleList = articleList,
        error: (err) => console.error('Error fetching public articles:', err)
      });
    }
  }

}