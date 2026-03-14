import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface BusinessOffer {
  id: number;
  name: string;
  availablePacks: number;
  reservedPacks: number;
  pickupTime: string;
  status: 'active' | 'soldout' | 'draft';
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-business-dashboard',
  templateUrl: './business-dashboard.component.html',
  styleUrl: './business-dashboard.component.scss'
})
export class BusinessDashboardComponent {
  offers: BusinessOffer[] = [
    {
      id: 1,
      name: 'Combo sorpresa de cena',
      availablePacks: 5,
      reservedPacks: 7,
      pickupTime: '8:30 p.m.',
      status: 'active'
    },
    {
      id: 2,
      name: 'Almuerzos del día',
      availablePacks: 0,
      reservedPacks: 6,
      pickupTime: '3:00 p.m.',
      status: 'soldout'
    },
    {
      id: 3,
      name: 'Postres del día',
      availablePacks: 8,
      reservedPacks: 2,
      pickupTime: '7:00 p.m.',
      status: 'active'
    },
    {
      id: 4,
      name: 'Bebidas y jugos',
      availablePacks: 12,
      reservedPacks: 0,
      pickupTime: '6:00 p.m.',
      status: 'draft'
    }
  ];

  stats = {
    publishedToday: 8,
    reserved: 15,
    foodRescued: 42,
    revenue: 380000
  };

  onPublishOffer() {
    alert('¡Nueva oferta publicada!\n\nTu pack sorpresa ya está disponible para que los usuarios lo reserven.');
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(price);
  }
}

