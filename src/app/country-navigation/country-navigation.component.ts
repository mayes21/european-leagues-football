import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamModel } from '../models/standings.model';
import { StandingComponent } from '../standing/standing.component';
import { Subscription } from 'rxjs';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-country-navigation',
  standalone: true,
  imports: [CommonModule, StandingComponent, RouterOutlet],
  templateUrl: './country-navigation.component.html',
  styleUrl: './country-navigation.component.css'
})
export class CountryNavigationComponent implements OnDestroy {

  private router = inject(Router);
  private standingSubscription: Subscription = new Subscription;
  
  selectedLeagueId: number = 0;
  
  teams: TeamModel[] = [];

  countries: string[] = ['england', 'spain', 'germany', 'france', 'italy'];
  leaguesMap: Map<string, number> = new Map([
    ['england', 39],
    ['spain', 140],
    ['germany', 78],
    ['france', 61],
    ['italy', 135]
  ]);

  loadLeague(country: string): void {
    this.selectedLeagueId = this.leaguesMap.get(country) as number;
    this.router.navigate(['league', this.selectedLeagueId]);
  }

  ngOnDestroy(): void {
    this.standingSubscription.unsubscribe();
  }

}
