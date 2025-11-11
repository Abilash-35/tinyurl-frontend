import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UrlService } from '../../services/url-service';
import { ShortUrl } from '../../models/short-url.model';

@Component({
  selector: 'app-url-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './url-list.html',
  styleUrls: ['./url-list.css']
})
export class UrlListComponent implements OnInit {
  urls: ShortUrl[] = [];
  loading = false;
  search = '';
  message = '';

  constructor(private urlService: UrlService) {}

  ngOnInit() {
    this.loadUrls();
  }

  // Load all public URLs
  loadUrls() {
    this.loading = true;
    this.message = '';

    this.urlService.listUrls().subscribe({
      next: (res) => {
        this.urls = res;
        this.loading = false;
        if (!res || res.length === 0) {
          this.message = 'No public URLs found.';
        }
      },
      error: (err) => {
        console.error('Failed to load URLs:', err);
        this.loading = false;
        this.message = 'Failed to load URLs.';
      }
    });
  }

  // Search URLs by code or term
  searchUrls() {
    const term = this.search.trim();
    if (!term) {
      this.loadUrls(); // if search box is empty, reload all
      return;
    }

    this.loading = true;
    this.message = '';
    console.log('Searching for:', term);

    this.urlService.listUrls(term).subscribe({
      next: (res) => {
        console.log('Response from backend:', res);
        this.urls = res;
        this.loading = false;
        if (!res || res.length === 0) {
          this.message = 'No matching URLs found.';
        }
      },
      error: (err) => {
        console.error('Search failed:', err);
        this.loading = false;
        this.message = 'Search failed.';
      }
    });
  }


  deleteUrl(idOrCode: string | number) {
    if (!confirm('Delete this URL?')) return;

    this.urlService.deleteUrl(idOrCode).subscribe({
      next: () => {
        this.urls = this.urls.filter((u) => u.id !== idOrCode);
        this.message = 'Deleted successfully.';
      },
      error: () => {
        this.message = 'Failed to delete.';
      }
    });
  }

  copy(shortURL: string) {
    navigator.clipboard.writeText(shortURL);
    this.message = 'Copied!';
    setTimeout(() => (this.message = ''), 2000);
  }
}
