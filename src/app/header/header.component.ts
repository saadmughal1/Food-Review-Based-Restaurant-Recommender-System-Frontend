import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [NgIf, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  
    currentUser: User | null = null
    isMenuOpen = false
  
    constructor(
      private authService: AuthService,
      private router: Router,
    ) {}
  
    ngOnInit(): void {
      this.authService.currentUser$.subscribe((user: User | null) => {
        this.currentUser = user
      })
    }
  
    logout(): void {
      this.authService.logout()
      this.router.navigate(["/"])
    }
  
    toggleMenu(): void {
      this.isMenuOpen = !this.isMenuOpen
    }

}
