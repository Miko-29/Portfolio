import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpaceComponent } from './shared/space/space.component';
import { CyberCityComponent } from './shared/cyber-city/cyber-city.component';
import { CosmosComponent } from './shared/cosmos/cosmos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CosmosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Portfolio';
}
