import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isCollapsed = false;


  //testing toggle button
  
  // toggleMenu() {
  //   console.log('Toggle menu clicked');
  //   this.isCollapsed = !this.isCollapsed;
  //   console.log('isCollapsed:', this.isCollapsed);
  // }
}
