import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { animate, Timeline } from 'animejs';
import { CosmosComponent } from '../../shared/cosmos/cosmos.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CosmosComponent, CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('container') containerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('pageContent', { static: false })
  pageContentRef!: ElementRef<HTMLDivElement>;

  text: string = `A frontend developer passionate about crafting responsive, intuitive web experiences with Angular and TypeScript, and everything in between. I believe great design isn't just about how it looks, but how it feels when you use it.`;
  showHomeIcon = false;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.createTypewriterEffect();
    // Animate in if coming from planet click
    if (localStorage.getItem('planetPageAnimate')) {
      localStorage.removeItem('planetPageAnimate');
      if (this.pageContentRef) {
        const el = this.pageContentRef.nativeElement;
        el.classList.add('animating');
        animate(el, {
          opacity: [0, 1],
          scale: [0.95, 1],
          duration: 700,
          easing: 'easeOutExpo',
          complete: () => {
            el.classList.remove('animating');
          },
        });
      }
    }
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }

  createTypewriterEffect() {
    const container = this.containerRef.nativeElement;
    container.innerHTML = '';

    // Create all characters first (invisible)
    const textElement = document.createElement('span');
    textElement.style.display = 'inline';

    // Create spans for each character
    for (let i = 0; i < this.text.length; i++) {
      const charSpan = document.createElement('span');
      charSpan.textContent = this.text[i];
      charSpan.style.opacity = '0';
      charSpan.style.transition = 'opacity 0.1s ease-in';
      textElement.appendChild(charSpan);
    }

    container.appendChild(textElement);

    // Create blinking cursor (initially invisible)
    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.color = '#fff';
    cursor.style.fontWeight = 'bold';
    cursor.style.opacity = '0';
    container.appendChild(cursor);

    // Add CSS animation for cursor blinking
    const style = document.createElement('style');
    style.textContent = `
      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    // Make characters appear one by one
    const charSpans = textElement.querySelectorAll('span');
    let currentIndex = 0;
    const typeSpeed = 50; // milliseconds per character

    const revealNextChar = () => {
      if (currentIndex < charSpans.length) {
        charSpans[currentIndex].style.opacity = '1';
        currentIndex++;
        setTimeout(revealNextChar, typeSpeed);
      } else {
        // All text is revealed, now start blinking cursor and show home icon
        cursor.style.opacity = '1';
        cursor.style.animation = 'blink 1s infinite';
        this.showHomeIcon = true;
      }
    };

    // Start the typewriter effect
    setTimeout(revealNextChar, 500);
  }
}
