import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UnsplashService } from '../../services/unsplash.service';

interface HeroOffer {
  imageUrl: string;
  businessName: string;
  offerName: string;
  pickupTime: string;
  currentPrice: number;
  originalPrice: number;
}

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {
  private unsplashService = inject(UnsplashService);

  heroImageUrl = '';
  heroOffers: HeroOffer[] = [];
  isLoading = true;

  ngOnInit() {
    this.loadImages();
  }

  private loadImages() {
    // Load hero image
    this.unsplashService.getImages('food plate restaurant', 1).subscribe(images => {
      this.heroImageUrl = images[0] || '';
    });

    // Load example offers
    this.unsplashService.getImages('bakery', 1).subscribe(images => {
      this.heroOffers.push({
        imageUrl: images[0] || '',
        businessName: 'Panadería La Cosecha',
        offerName: 'Combo sorpresa de pan artesanal',
        pickupTime: '8:30 p.m.',
        currentPrice: 8000,
        originalPrice: 20000
      });
    });

    this.unsplashService.getImages('restaurant', 1).subscribe(images => {
      this.heroOffers.push({
        imageUrl: images[0] || '',
        businessName: 'Restaurante La Parrilla',
        offerName: 'Combo sorpresa de cena',
        pickupTime: '9:00 p.m.',
        currentPrice: 12000,
        originalPrice: 28000
      });
    });

    this.unsplashService.getImages('vegetables', 1).subscribe(images => {
      this.heroOffers.push({
        imageUrl: images[0] || '',
        businessName: 'Mercado Verde',
        offerName: 'Frutas y verduras seleccionadas',
        pickupTime: '7:30 p.m.',
        currentPrice: 15000,
        originalPrice: 32000
      });
      this.isLoading = false;
    });
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(price);
  }

  calculateDiscount(original: number, current: number): number {
    return Math.round(((original - current) / original) * 100);
  }
}

