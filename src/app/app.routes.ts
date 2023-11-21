import { Routes } from '@angular/router';
import { CountryNavigationComponent } from './country-navigation/country-navigation.component';
import { standingResolver } from './standing/standing.resolver';

export const routes: Routes = [
    {
        path: '', component: CountryNavigationComponent,
        children: [
            {
                path: 'league/:id',
                resolve: {
                    standing: standingResolver
                },
                loadComponent: () => import('./standing/standing.component').then(c => c.StandingComponent)
            }
        ]
    },
    {
        path: 'fixture/league/:leagueId/team/:teamId',
        loadComponent: () => import('./fixture/fixture.component').then(c => c.FixtureComponent)
    }
];
