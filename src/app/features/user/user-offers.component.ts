import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnsplashService } from '../../services/unsplash.service';

export interface Offer {
  id: number;
  businessName: string;
  offerName: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
  pickupTime: string;
  distance: number;
  category: string;
  available: boolean;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-user-offers',
  templateUrl: './user-offers.component.html',
  styleUrl: './user-offers.component.scss'
})
export class UserOffersComponent implements OnInit {
  private unsplashService = inject(UnsplashService);

  offers: Offer[] = [];
  filteredOffers: Offer[] = [];
  isLoading = true;

  categories = ['Todos', 'Panaderías', 'Restaurantes', 'Supermercados'];
  selectedCategory = 'Todos';

  ngOnInit() {
    this.loadOffers();
  }

  private loadOffers() {
    const categoryImages: Record<string, string> = {
      'Panaderías': 'bakery',
      'Restaurantes': 'restaurant',
      'Supermercados': 'vegetables'
    };

    // Create mock offers
    const mockOffers: Omit<Offer, 'imageUrl'>[] = [
      {
        id: 1,
        businessName: 'Restaurante La Parrilla',
        offerName: 'Combo sorpresa de cena',
        price: 8000,
        originalPrice: 20000,
        pickupTime: '8:30 p.m.',
        distance: 1.2,
        category: 'Restaurantes',
        available: true
      },
      {
        id: 2,
        businessName: 'Panadería La Cosecha',
        offerName: 'Pack de panes y pasteles',
        price: 9500,
        originalPrice: 22000,
        pickupTime: '7:45 p.m.',
        distance: 0.6,
        category: 'Panaderías',
        available: true
      },
      {
        id: 3,
        businessName: 'Mercado Verde',
        offerName: 'Frutas y verduras del día',
        price: 14000,
        originalPrice: 30000,
        pickupTime: '7:00 p.m.',
        distance: 2.1,
        category: 'Supermercados',
        available: true
      },
      {
        id: 4,
        businessName: 'Donut Express',
        offerName: 'Caja de donas variadas',
        price: 6000,
        originalPrice: 15000,
        pickupTime: '9:00 p.m.',
        distance: 0.8,
        category: 'Panaderías',
        available: true
      },
      {
        id: 5,
        businessName: 'Sushi Master',
        offerName: 'Bandeja sushi del día',
        price: 18000,
        originalPrice: 42000,
        pickupTime: '8:00 p.m.',
        distance: 1.5,
        category: 'Restaurantes',
        available: true
      },
      {
        id: 6,
        businessName: 'Supermercado Econo',
        offerName: 'Pack de productos próximos a vencer',
        price: 12000,
        originalPrice: 28000,
        pickupTime: '6:30 p.m.',
        distance: 3.2,
        category: 'Supermercados',
        available: true
      },
      {
        id: 7,
        businessName: 'Pizzería Napoli',
        offerName: '2 pizzas medianas restantes',
        price: 16000,
        originalPrice: 38000,
        pickupTime: '9:30 p.m.',
        distance: 2.0,
        category: 'Restaurantes',
        available: false
      },
      {
        id: 8,
        businessName: 'Pastelería Dulces Sueños',
        offerName: 'Box de cupcakes y galletas',
        price: 7500,
        originalPrice: 18000,
        pickupTime: '6:00 p.m.',
        distance: 1.8,
        category: 'Panaderías',
        available: true
      }
    ];

    // Load images for each category
    const imagePromises = Object.entries(categoryImages).map(([category, query]) => {
      return this.unsplashService.getImages(query, 3).toPromise();
    });

    Promise.all(imagePromises).then(images => {
      const categoryImageMap: Record<string, string[]> = {
        'Panaderías': images[0] || [],
        'Restaurantes': images[1] || [],
        'Supermercados': images[2] || []
      };

      // Assign images cyclically to offers by category
      this.offers = mockOffers.map((offer, index) => {
        const categoryImages = categoryImageMap[offer.category] || [];
        const imageIndex = index % categoryImages.length;
        return {
          ...offer,
          imageUrl: categoryImages[imageIndex] || ''
        };
      });

      this.applyFilter();
      this.isLoading = false;
    });
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.applyFilter();
  }

  private applyFilter() {
    if (this.selectedCategory === 'Todos') {
      this.filteredOffers = [...this.offers];
    } else {
      this.filteredOffers = this.offers.filter(o => o.category === this.selectedCategory);
    }
  }

  onReserve(offer: Offer) {
    if (!offer.available) return;
    alert(`¡Reserva confirmada!\n\n${offer.offerName} en ${offer.businessName}\nPrecio: ${this.formatPrice(offer.price)}\nRecoger: ${offer.pickupTime}\n\nPresentá este código en el local.`);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(price);
  }
}

