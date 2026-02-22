import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Article } from '../model/Article';
import { ArticleServiceService } from '../app/article-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-article',
  imports: [FormsModule],
  templateUrl: './user-article.component.html',
  styleUrl: './user-article.component.css'
})
export class UserArticleComponent {
  article: Article = {
    id: 0,
    title: '',
    author: '',
    fullContent: '',
    halfContent: '',
    viewCount: 0,
    publishDate: new Date(),
    userId: ''
  };

  constructor(private articleService: ArticleServiceService, private router: Router) { }

  onSubmit() {
    this.articleService.addArticleService(this.article).subscribe(
      (response) => {
        this.router.navigate(['/articles'])
        console.log('Article created successfully:', response);
      },
      (error) => {
        console.error('Error creating article:', error);
      }
    );
    console.log('Article Submitted:', this.article);
  }
}
