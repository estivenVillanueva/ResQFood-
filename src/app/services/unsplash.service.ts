import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

export interface UnsplashPhoto {
  urls: {
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string;
}

export interface UnsplashSearchResponse {
  results: UnsplashPhoto[];
}

@Injectable({
  providedIn: 'root'
})
export class UnsplashService {
  private http = inject(HttpClient);

  // Demo API key - limited to 50 requests/hour
  // For production, replace with your own API key from https://unsplash.com/developers
  private accessKey = 'demo';
  private baseUrl = 'https://api.unsplash.com';

  getImages(query: string, perPage: number = 1): Observable<string[]> {
    // Check if using demo mode (no real API key)
    if (this.accessKey === 'demo') {
      return this.getDemoImages(query, perPage);
    }

    const params = new HttpParams()
      .set('query', query)
      .set('per_page', perPage.toString())
      .set('orientation', 'landscape');

    return this.http.get<UnsplashSearchResponse>(`${this.baseUrl}/search/photos`, {
      headers: {
        'Authorization': `Client-ID ${this.accessKey}`
      },
      params
    }).pipe(
      map((response: UnsplashSearchResponse) => response.results.map((photo: UnsplashPhoto) => photo.urls.regular)),
      catchError(() => this.getDemoImages(query, perPage))
    );
  }

  private getDemoImages(query: string, perPage: number): Observable<string[]> {
    // Fallback to Unsplash source URLs for demo mode
    const demoImages: Record<string, string[]> = {
      'food': [
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
        'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800'
      ],
      'bakery': [
        'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
        'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800',
        'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800'
      ],
      'restaurant': [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
        'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800',
        'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800'
      ],
      'vegetables': [
        'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800',
        'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=800',
        'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800'
      ],
      'food plate restaurant': [
        'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800'
      ]
    };

    const key = Object.keys(demoImages).find(k =>
      query.toLowerCase().includes(k.toLowerCase())
    );

    const images = key ? demoImages[key] : demoImages['food'];
    return of(images.slice(0, perPage));
  }
}