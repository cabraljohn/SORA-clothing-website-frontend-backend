import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<any[]>([]);
  private cartCount = new BehaviorSubject<number>(0);

  cart$ = this.cart.asObservable();
  cartCount$ = this.cartCount.asObservable();

  addToCart(product: any) {
    const currentCart = this.cart.getValue();
    this.cart.next([...currentCart, product]);
    this.cartCount.next(this.cartCount.getValue() + 1);
  }

  removeFromCart(index: number) {
    const currentCart = this.cart.getValue();
    const newCart = currentCart.filter((_, i) => i !== index);
    this.cart.next(newCart);
    this.cartCount.next(this.cartCount.getValue() - 1);
  }
} 