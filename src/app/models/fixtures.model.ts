export interface Fixtures {
    get:        string;
    parameters: Parameters;
    results:    number;
    paging:     Paging;
    response:   Response[];
}

export interface Paging {
    current: number;
    total:   number;
}

export interface Parameters {
    league: string;
    season: string;
    team:   string;
}

export interface Response {
    fixture: Fixture;
    league:  League;
    teams:   {
        home: Team;
        away: Team;
    }
    goals:   Goals;
    score:   Score;
}

export interface Fixture {
    id:        number;
    referee:   null | string;
    timezone:  Timezone;
    date:      Date;
    timestamp: number;
    periods:   Periods;
    venue:     Venue;
    status:    Status;
}

export interface Periods {
    first:  number | null;
    second: number | null;
}

export interface Status {
    long:    Long;
    short:   Short;
    elapsed: number | null;
}

export enum Long {
    MatchFinished = "Match Finished",
    NotStarted = "Not Started",
}

export enum Short {
    Ft = "FT",
    NS = "NS",
}

export enum Timezone {
    UTC = "UTC",
}

export interface Venue {
    id:   number;
    name: string;
    city: string;
}

export interface Goals {
    home: number | undefined;
    away: number | undefined;
}

export interface Team {
    id:     number;
    name:   string;
    logo:   string;
    winner: boolean | undefined;
}

export interface League {
    id:      number;
    name:    LeagueName;
    country: Country;
    logo:    string;
    flag:    string;
    season:  number;
    round:   string;
}

export type Country = 'England' | 'Spain' | 'Germany' | 'France' | 'Italy';

export type LeagueName = 'Premier League' | 'La Liga' | 'Bundesliga' | 'Ligue 1' | 'Serie A';

export interface Score {
    halftime:  Goals;
    fulltime:  Goals;
    extratime: Goals;
    penalty:   Goals;
}

export interface FixtureModel {
    homeTeam: TeamModel;
    awayTeam: TeamModel;
}

export interface TeamModel {
    name: string;
    logo: string;
    goals: number;
}