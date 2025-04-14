// filepath: c:\Users\vijay\Videos\dotnetprivate2024\April2025On\angularapril14c\src\app\app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { DcComicsFormComponent } from './dc-comics-form/dc-comics-form.component';
import { NasaUrlGeneratorComponent } from './nasa-url-generator/nasa-url-generator.component';
import { WeatherComponent } from './components/weather/weather.component';
import { RandomQuoteComponent } from './components/random-quote/random-quote.component';
import { CreatePublisherComponent } from './components/create-publisher/create-publisher.component';
import { CreateComicComponent } from './components/create-comic/create-comic.component';
import { CreateCharacterComponent } from './components/create-character/create-character.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Use HomeComponent for the home route
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'gallery', component: PhotoGalleryComponent }, // Photo Gallery route
  { path: 'dc-form', component: DcComicsFormComponent }, // Add this route
  { path: 'nasa-url', component: NasaUrlGeneratorComponent }, // Add this route
  { path: 'weather', component: WeatherComponent }, // Add this route
  { path: 'random-quote', component: RandomQuoteComponent }, // Add this route
  { path: 'create-publisher', component: CreatePublisherComponent }, // Add this route
  { path: 'create-comic', component: CreateComicComponent }, // Add this route
  { path: 'create-character', component: CreateCharacterComponent }, // Add this route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}