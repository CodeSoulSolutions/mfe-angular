import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-body',
  imports: [HeaderComponent, MatButtonModule, CommonModule, RouterOutlet],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {
    title = 'angular_learning';
    gameStarted: boolean = false;
  
    constructor(private router: Router) {}
  
    navigateToUserForm(): void {
      this.gameStarted = true;
      this.router.navigate(['/tictactoe/user-information/X']);
    }
    
    navigateToApiDemo(): void {
      this.router.navigate(['/api']);
    }
}
