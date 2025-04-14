// filepath: c:\Users\vijay\Videos\dotnetprivate2024\April2025On\angularapril14c\src\app\app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { DcComicsFormComponent } from './dc-comics-form/dc-comics-form.component';
import { NasaUrlGeneratorComponent } from './nasa-url-generator/nasa-url-generator.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Use HomeComponent for the home route
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'gallery', component: PhotoGalleryComponent }, // Photo Gallery route
  { path: 'dc-form', component: DcComicsFormComponent }, // Add this route
  { path: 'nasa-url', component: NasaUrlGeneratorComponent } // Add this route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}