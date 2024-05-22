import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/news.service';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsArticles: NewsArticle[] = [];
  isLoading = true;
  error: string | null = null;
  keyword: string = '';

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.getTopNews();
  }

  getTopNews() {
    this.isLoading = true;
    this.newsService.getNews()
      .subscribe(
        (articles: NewsArticle[]) => {
          this.newsArticles = articles;
          this.isLoading = false;
        },
        (error: any) => {
          this.error = "Error fetching news: " + error.message;
          this.isLoading = false;
        }
      );
  }

  searchNews() {
    if (this.keyword.trim() !== '') {
      this.isLoading = true;
      this.newsService.getNewsByKeyword(this.keyword)
        .subscribe(
          (articles: NewsArticle[]) => {
            this.newsArticles = articles;
            this.isLoading = false;
          },
          (error: any) => {
            this.error = "Error fetching news: " + error.message;
            this.isLoading = false;
          }
        );
    } else {
      this.getTopNews();
    }
  }
}
