import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Fixtures, FixtureModel } from '../models/fixtures.model';
import { Observable, map, shareReplay } from 'rxjs';
import { environment } from '../../environments/environment';
import { SeasonService } from './season.service';

@Injectable({
  providedIn: 'root'
})
export class FixtureService {

  private httpClient = inject(HttpClient);
  private seasonService = inject(SeasonService);

  getFixture(teamId: number, leagueId: number): Observable<FixtureModel[]> {
    const headers = new HttpHeaders({
      'x-rapidapi-key': environment.API_KEY
    });

    const params = new HttpParams()
      .set('league', leagueId.toString())
      .set('team', teamId.toString())
      .set('season', this.seasonService.getCurrentSeason())
      .set('last', 10); // the last 10 results of the team [teamId]

    return this.httpClient.get<Fixtures>(`${environment.API_URL}/fixtures`, { headers, params }).pipe(
      shareReplay(1),
      map(data => {
        const fixtures: FixtureModel[] = [];
        data.response.slice(0, 10).forEach(fixture => {
          fixtures.push({
            homeTeam: {
              name: fixture.teams.home.name,
              logo: fixture.teams.home.logo,
              goals: fixture.goals.home as number
            },
            awayTeam: {
              name: fixture.teams.away.name,
              logo: fixture.teams.away.logo,
              goals: fixture.goals.away as number
            }
          })
        });
        return fixtures;
      })
    )
  }
}
