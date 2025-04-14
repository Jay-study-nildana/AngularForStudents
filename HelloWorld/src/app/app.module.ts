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

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    PhotoGalleryComponent,
    DcComicsFormComponent,
    NasaUrlGeneratorComponent
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
