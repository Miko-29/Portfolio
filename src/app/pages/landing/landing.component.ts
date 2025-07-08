import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { animate } from 'animejs';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent implements AfterViewInit {
  @ViewChild('scene', { static: true }) sceneRef!: ElementRef;
  stars = Array(300).fill(0);

  ngAfterViewInit(): void {
    const stars = this.sceneRef.nativeElement.querySelectorAll('.star');
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    stars.forEach((star: HTMLElement, index: number) => {
      const angle = Math.random() * 2 * Math.PI;

      // Offset position slightly around center (small radius)
      const startRadius = Math.random(); // tweak 40 → 10/100 for tighter/looser start
      const startX = centerX + Math.cos(angle) * startRadius;
      const startY = centerY + Math.sin(angle) * startRadius;

      // Distance to move outward
      const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2) * 2;
      const distance = Math.random() * maxDistance + maxDistance * 0.5;

      // Set initial position
      star.style.left = `${startX}px`;
      star.style.top = `${startY}px`;

      // Animate outward from center
      animate(star, {
        translateX: Math.cos(angle) * distance,
        translateY: Math.sin(angle) * distance,
        translateZ: ['-500px', '0px'],
        scale: [1, 5],
        opacity: [{ value: 1 }, { value: 0, duration: 2000 }],
        duration: Math.random() * 10000,
        delay: Math.random() * 1500,
        easing: 'easeOutQuad',
        loop: true,
        borderRadius: 10,
        filter: 'blur(1px)',
      });
    });
  }
}
