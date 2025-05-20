import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeroComponent } from './hero/hero.component';
import { FeaturedProjectsComponent } from './featured-projects/featured-projects.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent,
    FeaturedProjectsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
