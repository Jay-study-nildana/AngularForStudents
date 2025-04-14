import { Component } from '@angular/core';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent {
  galleryImages: Array<{ src: string; caption: string; thumb: string }> = [
    { src: 'assets/images/image1.jpg', thumb: 'assets/images/image1.jpg', caption: 'Photo 1' },
    { src: 'assets/images/image2.jpg', thumb: 'assets/images/image2.jpg', caption: 'Photo 2' },
    { src: 'assets/images/image3.jpg', thumb: 'assets/images/image3.jpg', caption: 'Photo 3' },
    { src: 'assets/images/image4.jpg', thumb: 'assets/images/image4.jpg', caption: 'Photo 4' },
    { src: 'assets/images/image5.jpg', thumb: 'assets/images/image5.jpg', caption: 'Photo 5' },
    { src: 'assets/images/image6.jpg', thumb: 'assets/images/image6.jpg', caption: 'Photo 6' },
    { src: 'assets/images/image7.jpg', thumb: 'assets/images/image7.jpg', caption: 'Photo 7' },
    { src: 'assets/images/image8.jpg', thumb: 'assets/images/image8.jpg', caption: 'Photo 8' },
    { src: 'assets/images/image9.jpg', thumb: 'assets/images/image9.jpg', caption: 'Photo 9' },
    { src: 'assets/images/image10.jpg', thumb: 'assets/images/image10.jpg', caption: 'Photo 10' }
  ];

  isModalOpen = false;
  currentImageIndex = 0;

  openModal(index: number): void {
    this.currentImageIndex = index;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  prevImage(): void {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.galleryImages.length;
  }
}