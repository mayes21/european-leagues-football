import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {
  public getCurrentSeason(): string {
    return new Date().getFullYear().toString();
  }
}
