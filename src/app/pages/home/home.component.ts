import { Component } from '@angular/core';
import { FeaturedProjectsComponent } from "./featured-projects/featured-projects.component";
import { HeroComponent } from "./hero/hero.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FeaturedProjectsComponent, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
