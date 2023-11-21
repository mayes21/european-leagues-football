import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamModel } from '../models/standings.model';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-standing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './standing.component.html',
  styleUrl: './standing.component.css'
})
export class StandingComponent implements OnInit {

  @Input() id!: number;
  standing: TeamModel[] = [];
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((value) => (this.standing = value['standing']));
  }
  
}
