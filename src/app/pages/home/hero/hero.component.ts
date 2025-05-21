import { Component, AfterViewInit } from '@angular/core';
declare var anime: any;

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    anime
      .timeline()
      .add({
        targets: '.hero-title',
        translateY: [100, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 300,
      })
      .add({
        targets: '.hero-subtitle',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: 'easeOutExpo',
      });
  }
}
