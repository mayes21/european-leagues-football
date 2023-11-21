import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { TeamModel } from "../models/standings.model";
import { StandingService } from "../services/standing.service";
import { inject } from "@angular/core";

export const standingResolver: ResolveFn<TeamModel[]> = (route: ActivatedRouteSnapshot) => {
    return inject(StandingService).getStandings(route.params['id']);
};