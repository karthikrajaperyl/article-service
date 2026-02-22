import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../model/Article';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleServiceService {

  private fusionApiEnpoint = '/api/fusion/v1';

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getArticleShortService(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.fusionApiEnpoint}/allArticle`);
  }

  addArticleService(article: Article): Observable<Article> {
    const token = this.authService.getToken();
    const user = this.authService.getUserDetails();
    if (user != null)
      article.userId = user.toString();
    else
      return this.httpClient.post<Article>(this.fusionApiEnpoint, article);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<Article>(this.fusionApiEnpoint, article, { headers });
  }

  getPublicArticleShortService(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.fusionApiEnpoint}/allArticle`);
  }

  getUserSpecificArticleShortService(userId: string): Observable<Article[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<Article[]>(`${this.fusionApiEnpoint}/getUserArticle/${userId}`, { headers });
  }
}
