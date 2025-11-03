import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UrlService } from '../../services/url-service';
import { ShortUrl } from '../../models/short-url.model';

@Component({
  selector: 'app-url-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './url-form.html',
  styleUrls: ['./url-form.css']
})
export class UrlFormComponent {
  originalUrl = '';
  isPrivate = false;
  createdUrl?: ShortUrl;
  errorMsg = '';
  successMsg = '';
  loading = false;

  constructor(private urlService: UrlService) {}

  onSubmit() {
    if (!this.originalUrl.trim()) {
      this.errorMsg = 'Please enter a valid URL';
      this.successMsg = '';
      return;
    }

    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    const payload = {
      originalUrl: this.originalUrl,
      isPrivate: this.isPrivate
    };

    //check payload
    console.log('Submitting payload:', payload);
this.urlService.createShortUrl(payload).subscribe({
  next: (res: any) => {
    console.log('Response from backend:', res);

    this.createdUrl = {
      ...res,
      shortURL: res.shortUrl || res.shortURL || `${location.origin}/${res.code}`
    };

    this.loading = false;
    this.successMsg = 'Short URL created successfully!';
  },
  error: (err) => {
    console.error('Error from backend:', err);
    this.loading = false;
    this.errorMsg = 'Failed to create short URL';
  }
    });
  }

  copy(shortURL: string) {
    navigator.clipboard.writeText(shortURL);
    this.successMsg = 'Copied to clipboard!';
    setTimeout(() => (this.successMsg = ''), 2000);
  }
}