import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar
      [cartCount]="cart.length"
      [isLoggedIn]="isLoggedIn"
      (cartClick)="showCart = true"
      (authClick)="showAuth = true"
      (profileClick)="showProfile = true">
    </app-navbar>

    <app-hero></app-hero>
    <app-products (addToCart)="addToCart($event)"></app-products>
    <app-about></app-about>
    <app-contact></app-contact>
    <app-footer></app-footer>

    <app-cart
      *ngIf="showCart"
      [items]="cart"
      (close)="showCart = false"
      (removeItem)="removeFromCart($event)">
    </app-cart>

    <app-auth
      *ngIf="showAuth"
      (close)="showAuth = false"
      (login)="handleLogin($event)">
    </app-auth>

    <app-profile
      *ngIf="showProfile"
      [user]="user"
      (close)="showProfile = false"
      (logout)="handleLogout()">
    </app-profile>
  `
})
export class AppComponent {
  cart: any[] = [];
  isLoggedIn = false;
  user: any = null;
  showCart = false;
  showAuth = false;
  showProfile = false;

  addToCart(product: any) {
    this.cart = [...this.cart, product];
  }

  removeFromCart(index: number) {
    this.cart = this.cart.filter((_, i) => i !== index);
  }

  handleLogin(userData: any) {
    this.user = userData;
    this.isLoggedIn = true;
    this.showAuth = false;
    this.showProfile = true;
  }

  handleLogout() {
    this.user = null;
    this.isLoggedIn = false;
    this.showProfile = false;
  }
} 