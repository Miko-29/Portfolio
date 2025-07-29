import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CosmosComponent } from '../../shared/cosmos/cosmos.component';
import { CommonModule } from '@angular/common';
import { animate } from 'animejs';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CosmosComponent, CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements AfterViewInit {
  @ViewChild('pageContent', { static: false })
  pageContentRef!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
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
}
