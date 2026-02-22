import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ArticleListComponent } from '../article-list/article-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ArticleListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'enlarge';
  ngOnInit() {
    console.log("App Component ngOnInit");
  }
}
