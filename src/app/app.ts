import { Component } from '@angular/core';
import { UrlFormComponent } from './components/url-form/url-form';
import { UrlListComponent } from './components/url-list/url-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UrlFormComponent, UrlListComponent],
  template: `
    <div class="container">
      <h1 class="title">Tiny URL</h1>
      <app-url-form></app-url-form>
      <app-url-list></app-url-list>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 2rem auto;
      padding: 1rem;
      text-align: center;
    }
    .title {
      color: #175fa8ff; /* Nice blue shade */
      font-weight: 600;
      margin-bottom: 1.5rem;
    }
  `]
})
export class App {}