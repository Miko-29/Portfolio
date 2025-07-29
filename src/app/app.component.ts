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
  // In main.ts or app.component.ts (ngOnInit)
  ngOnInit() {
    // Comet head
    const comet = document.getElementById('comet-cursor');
    // Trail canvas
    const canvas = document.getElementById(
      'comet-trail-canvas'
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });

    // Trail points
    const trail: { x: number; y: number; alpha: number }[] = [];
    const maxTrail = 40;

    document.addEventListener('mousemove', (e) => {
      // Move comet head
      if (comet) {
        comet.style.transform = `translate(${e.clientX - 16}px, ${
          e.clientY - 16
        }px)`;
      }
      // Add new trail point
      trail.push({ x: e.clientX, y: e.clientY, alpha: 1 });
      if (trail.length > maxTrail) trail.shift();
    });

    // Animation loop for the smoky trail
    function animateTrail() {
      ctx.clearRect(0, 0, width, height);
      // Draw trail as smoky circles
      for (let i = 0; i < trail.length; i++) {
        const t = trail[i];
        ctx.save();
        ctx.globalAlpha = t.alpha * 0.12; // less opaque
        const radius = 12 + i * 0.6; // reduced radius
        const grad = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, radius);
        grad.addColorStop(0, '#617c7e');
        grad.addColorStop(0.7, 'rgba(97,124,126,0.2)');
        grad.addColorStop(1, 'rgba(86,85,124,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(t.x, t.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        // Fade out
        t.alpha *= 0.92;
      }
      requestAnimationFrame(animateTrail);
    }
    animateTrail();
  }
}
