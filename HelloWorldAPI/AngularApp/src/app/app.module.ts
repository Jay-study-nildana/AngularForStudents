import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { LightboxModule } from 'ngx-lightbox';
import { DcComicsFormComponent } from './dc-comics-form/dc-comics-form.component';
import { NasaUrlGeneratorComponent } from './nasa-url-generator/nasa-url-generator.component';
import { WeatherComponent } from './components/weather/weather.component';
import { RandomQuoteComponent } from './components/random-quote/random-quote.component';
import { CreatePublisherComponent } from './components/create-publisher/create-publisher.component';
import { CreateComicComponent } from './components/create-comic/create-comic.component';
import { CreateCharacterComponent } from './components/create-character/create-character.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    PhotoGalleryComponent,
    DcComicsFormComponent,
    NasaUrlGeneratorComponent,
    WeatherComponent,
    RandomQuoteComponent,
    CreatePublisherComponent,
    CreateComicComponent,
    CreateCharacterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LightboxModule,
    FormsModule, // Add FormsModule here
    HttpClientModule // Add HttpClientModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
