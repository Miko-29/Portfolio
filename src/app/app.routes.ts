import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProjectDetailComponent } from './pages/work/project-detail/project-detail.component';
import { WorkComponent } from './pages/work/work.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'work', component: WorkComponent },
  { path: 'work/:id', component: ProjectDetailComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' },
];
  
