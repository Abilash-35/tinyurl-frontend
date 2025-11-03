import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ShortUrl } from '../models/short-url.model';

@Injectable({ providedIn: 'root' })
export class UrlService {
  private base = `${environment.apiBase}/api/tinyurl`; 
  // points directly to backend url

  constructor(private http: HttpClient) {}

  // Create short URL
  createShortUrl(payload: { originalUrl: string; isPrivate: boolean }): Observable<ShortUrl> {
    return this.http.post<ShortUrl>(this.base, payload);
  }

   // List all public URLs or search by term
  listUrls(search?: string): Observable<ShortUrl[]> {
    if (search && search.trim()) {
      // search endpoint if term provided
      const encoded = encodeURIComponent(search.trim());
      return this.http.get<ShortUrl[]>(`${this.base}/search/${encoded}`);
    } else {
      // list all if no search term
      return this.http.get<ShortUrl[]>(this.base);
    }
  }

  // Delete URL by id
  deleteUrl(idOrCode: string | number): Observable<any> {
    return this.http.delete(`${this.base}/${idOrCode}`);
  }
}