import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-featured-projects',
  standalone: true,
  imports: [NgFor],
  templateUrl: './featured-projects.component.html',
  styleUrls: ['./featured-projects.component.css'],
})
export class FeaturedProjectsComponent {
  projects = [
    {
      title: 'Project One',
      description: 'A web app for portfolios.',
      img: 'assets/img1.jpg',
    },
    {
      title: 'Project Two',
      description: 'Creative animation site.',
      img: 'assets/img2.jpg',
    },
  ];
}
