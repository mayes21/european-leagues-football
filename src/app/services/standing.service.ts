import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Standings, TeamModel } from '../models/standings.model';
import { Observable, map, shareReplay } from 'rxjs';
import { SeasonService } from './season.service';

@Injectable({
  providedIn: 'root'
})
export class StandingService {

  private httpClient = inject(HttpClient);
  private seasonService = inject(SeasonService);

  getStandings(leagueId: number): Observable<TeamModel[]> {
    const headers = new HttpHeaders({
      'x-rapidapi-key': environment.API_KEY
    });

    const params = new HttpParams()
      .set('league', leagueId.toString())
      .set('season', this.seasonService.getCurrentSeason());

    return this.httpClient.get<Standings>(`${environment.API_URL}/standings`, { headers, params }).pipe(
      shareReplay(1),
      map(data => {
        const teams: TeamModel[] = [];
        data.response[0].league.standings.forEach((standing) => {
          standing.forEach(element => {
            teams.push({
              rank: element.rank,
              id: element.team.id,
              name: element.team.name,
              logo: element.team.logo,
              gamesPlayed: element.all.played,
              wins: element.all.win,
              losses: element.all.lose,
              draws: element.all.draw,
              goalDifference: element.goalsDiff,
              numberOfPoints: element.points
            });
          });
        });
        return teams;
      })
    );
  }
}

