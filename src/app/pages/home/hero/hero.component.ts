import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { animate, stagger } from 'animejs';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('scene', { static: true }) sceneRef!: ElementRef;
  @ViewChild('container') containerRef!: ElementRef<HTMLDivElement>;
  stars = Array(100).fill(0);
  words: string[] =
    'A frontend developer passionate about crafting responsive, intuitive web experiences with Angular and TypeScript, and everything in between. I believe great design isn’t just about how it looks, but how it feels when you use it. '.split(
      ' '
    );
  currentIndex = 0;
  maxIndex = 0;
  ngAfterViewInit() {
    this.maxIndex = this.words.length;
    document.body.style.overflow = 'hidden'; // Lock scroll

    const stars = this.sceneRef.nativeElement.querySelectorAll('.star');
    // const centerX = window.innerWidth / 2;
    // const centerY = window.innerHeight / 2;

    stars.forEach((star: HTMLElement, index: number) => {
      // const angle = Math.random() * 2 * Math.PI;

    //   // Offset position slightly around center (small radius)
      // const startRadius = Math.random(); // tweak 40 → 10/100 for tighter/looser start
      // const startX = centerX + Math.cos(angle) * startRadius;
      // const startY = centerY + Math.sin(angle) * startRadius;

    //   // Distance to move outward
    //   const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2) * 2;
    //   const distance = Math.random() * maxDistance + maxDistance * 0.5;

    //   //Set initial size
      const size = Math.random() * 5;

    //   // Set initial position
      star.style.left = `${Math.random() * window.innerWidth}px`;
      star.style.top = `${Math.random() * window.innerHeight}px`;
      // star.style.height = `${size}px`;
      // star.style.width = `${size}px`;
      star.style.border = `${size}px solid white`;
      star.style.borderRadius = '50%';
      star.style.filter = 'blur(1px)';

    //   // Animate outward from center
    //   animate(star, {
    //     translateX: Math.cos(angle) * distance,
    //     translateY: Math.sin(angle) * distance,
    //     translateZ: ['-500px', '0px'],
    //     scale: [size * 1, size * 5],
    //     opacity: [{ value: 1 }, { value: 0, duration: 2000 }],
    //     duration: Math.random() * 10000,
    //     delay: Math.random() * 1500,
    //     easing: 'easeOutQuad',
    //     loop: true,
    //     borderRadius: 10,
    //     filter: 'blur(1px)',
    //   });
    });
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    if (event.deltaY > 0) {
      this.revealNextWord();
    } else {
      this.revealPreviousWord();
    }

    event.preventDefault(); // Prevent actual scroll
  }

  revealNextWord() {
    if (this.currentIndex >= this.maxIndex) return;

    const nextSpan = this.containerRef.nativeElement.querySelectorAll(
      '.sui-text-reveal'
    )[this.currentIndex] as HTMLElement;

    if (nextSpan) {
      animate(nextSpan, {
        opacity: 1,
        translateY: [20, 0],
        duration: 400,
        easing: 'easeOutCubic',
      });
    }

    this.currentIndex++;
  }

  revealPreviousWord() {
    if (this.currentIndex <= 0) return;

    this.currentIndex--;

    const prevSpan = this.containerRef.nativeElement.querySelectorAll(
      '.sui-text-reveal'
    )[this.currentIndex] as HTMLElement;

    if (prevSpan) {
      animate(prevSpan, {
        opacity: 0,
        translateY: 20,
        duration: 300,
        easing: 'easeInCubic',
      });
    }
  }
}
