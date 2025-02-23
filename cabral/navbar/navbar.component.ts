import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <header>
      <nav>
        <div class="logo">SORA</div>
        <ul class="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#collection">Collection</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
          <ng-container *ngIf="!isLoggedIn">
            <li><button class="auth-btn" (click)="authClick.emit()">Login</button></li>
            <li><button class="auth-btn" (click)="authClick.emit()">Register</button></li>
          </ng-container>
        </ul>
        <div>
          <div class="cart-icon" (click)="cartClick.emit()">
            <i class="fas fa-shopping-cart"></i>
            <span id="cart-count">{{cartCount}}</span>
          </div>
          <div class="profile-icon-nav" (click)="profileClick.emit()">
            <i class="fas fa-user-circle"></i>
          </div>
        </div>
      </nav>
    </header>
  `
})
export class NavbarComponent {
  @Input() cartCount: number = 0;
  @Input() isLoggedIn: boolean = false;
  @Output() cartClick = new EventEmitter();
  @Output() authClick = new EventEmitter();
  @Output() profileClick = new EventEmitter();
} 