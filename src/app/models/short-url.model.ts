export interface ShortUrl {
  id: number;
  code: string;
  originalURL: string;
  shortURL: string;
  isPrivate: boolean;
  totalClicks: number;
  createdAt: string;
}
