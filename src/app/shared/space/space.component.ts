import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate } from 'animejs';

@Component({
  selector: 'app-space',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './space.component.html',
  styleUrl: './space.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SpaceComponent {
  @ViewChild('scene', { static: true }) sceneRef!: ElementRef;
  stars = Array(100).fill(0);
  ngAfterViewInit() {
    const stars = this.sceneRef.nativeElement.querySelectorAll('.star');

    stars.forEach((star: HTMLElement, index: number) => {
      //   //Set initial size
      const size = Math.random()*2;

      //   // Set initial position
      star.style.left = `${Math.random() * window.innerWidth}px`;
      star.style.top = `${Math.random() * window.innerHeight}px`;
      star.style.border = `${size}px solid white`;
      star.style.borderRadius = '50%';
      star.style.filter = 'blur(1px)';

      //   // Animate twinkling
      animate(star, {
        scale: [size*1, size*1.5],
        duration: 1000,
        delay: Math.random() * 1500,
        easing: 'easeOutQuad',
        loop: true,
        alternate: true,
        borderRadius: 10,
        // filter: 'blur(2px)',
      });
    });
  }
}
