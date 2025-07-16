import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { animate } from 'animejs';
import { from } from 'rxjs';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('container') containerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('heading') headingRef!: ElementRef;

  words: string[] =
    'A frontend developer passionate about crafting responsive, intuitive web experiences with Angular and TypeScript, and everything in between. I believe great design isn’t just about how it looks, but how it feels when you use it. '.split(
      ' '
    );
  currentIndex = 0;
  maxIndex = 0;
  scrollStage = 0;

  // @HostListener('wheel', ['$event'])
  // onWheel(event: WheelEvent) {
  //   event.preventDefault(); // prevent page scroll

  //   if (event.deltaY > 0) {
  //     if (this.scrollStage === 0) {
  //       this.animateHeadingToCorner();
  //       this.scrollStage = 1;
  //     } else {
  //       this.revealNextWord();
  //     }
  //   } else {
  //     if (this.scrollStage === 1 && this.currentIndex === 0) {
  //       this.animateHeadingToCenter();
  //       this.scrollStage = 0;
  //     } else if (this.scrollStage === 1) {
  //       this.revealPreviousWord();
  //     }
  //   }
  // }

  animateHeadingToCorner() {
    animate(this.headingRef.nativeElement, {
      translateX: { from: 200 },
      translateY: { from: 200 },
      // scale: 0.6,
      duration: 700,
      easing: 'easeInOutCubic',
    });
  }

  animateHeadingToCenter() {
    animate(this.headingRef.nativeElement, {
      translateX: 0,
      translateY: 0,
      scale: 1,
      duration: 600,
      easing: 'easeInOutCubic',
    });
  }

  revealNextWord() {
    const spans =
      this.containerRef.nativeElement.querySelectorAll('.text-reveal');
    if (this.currentIndex >= spans.length) return;

    const nextSpan = spans[this.currentIndex] as HTMLElement;

    animate(nextSpan, {
      opacity: 1,
      translateY: [20, 0],
      duration: 400,
      easing: 'easeOutCubic',
    });

    this.currentIndex++;
  }

  revealPreviousWord() {
    if (this.currentIndex <= 0) return;

    this.currentIndex--;

    const prevSpan = this.containerRef.nativeElement.querySelectorAll(
      '.text-reveal'
    )[this.currentIndex] as HTMLElement;

    animate(prevSpan, {
      opacity: 0,
      translateY: 20,
      duration: 300,
      easing: 'easeInCubic',
    });
  }

  ngAfterViewInit() {
    this.maxIndex = this.words.length;
    document.body.style.overflow = 'hidden'; // Lock scroll
  }

  // @HostListener('wheel', ['$event'])
  // onWheel(event: WheelEvent) {
  //   if (event.deltaY > 0) {
  //     this.revealNextWord();
  //   } else {
  //     this.revealPreviousWord();
  //   }

  //   event.preventDefault(); // Prevent actual scroll
  // }

  // revealNextWord() {
  //   if (this.currentIndex >= this.maxIndex) return;

  //   const nextSpan = this.containerRef.nativeElement.querySelectorAll(
  //     '.text-reveal'
  //   )[this.currentIndex] as HTMLElement;

  //   if (nextSpan) {
  //     animate(nextSpan, {
  //       opacity: 1,
  //       translateY: [20, 0],
  //       duration: 400,
  //       easing: 'easeOutCubic',
  //     });
  //   }

  //   this.currentIndex++;
  // }

  // revealPreviousWord() {
  //   if (this.currentIndex <= 0) return;

  //   this.currentIndex--;

  //   const prevSpan = this.containerRef.nativeElement.querySelectorAll(
  //     '.text-reveal'
  //   )[this.currentIndex] as HTMLElement;

  //   if (prevSpan) {
  //     animate(prevSpan, {
  //       opacity: 0,
  //       translateY: 20,
  //       duration: 300,
  //       easing: 'easeInCubic',
  //     });
  //   }
  // }
}
