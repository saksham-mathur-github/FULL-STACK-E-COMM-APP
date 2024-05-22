import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=f1d836f7dd544dc89a6faf322782156c'; // Replace with your API key
  private searchUrl = 'https://newsapi.org/v2/everything?apiKey=f1d836f7dd544dc89a6faf322782156c&q=';

  constructor(private http: HttpClient) {}

  getNews(): Observable<NewsArticle[]> {
    return this.http.get<any>(this.apiUrl)
      .pipe(
        map(data => data.articles)
      );
  }

  getNewsByKeyword(keyword: string): Observable<NewsArticle[]> {
    const url = `${this.searchUrl}${keyword}`;
    return this.http.get<any>(url)
      .pipe(
        map(data => data.articles)
      );
  }
}
