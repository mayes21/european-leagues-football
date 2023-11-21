import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FixtureService } from '../services/fixture.service';
import { FixtureModel } from '../models/fixtures.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fixture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fixture.component.html',
  styleUrl: './fixture.component.css'
})
export class FixtureComponent implements OnInit, OnDestroy {

  @Input() leagueId!: number;
  @Input() teamId!: number;

  private fixtureService = inject(FixtureService);
  private router = inject(Router);
  private fixtureSubscription: Subscription = new Subscription;

  fixtures: FixtureModel[] = [];

  ngOnInit(): void {
    this.fixtureSubscription = this.fixtureService.getFixture(this.teamId, this.leagueId)
      .subscribe(data => this.fixtures = data);
  }

  back(): void {
    this.router.navigate(['league', this.leagueId]);
  }

  ngOnDestroy(): void {
    this.fixtureSubscription.unsubscribe();
  }
}
