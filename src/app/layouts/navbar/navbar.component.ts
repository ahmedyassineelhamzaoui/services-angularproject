import { outputAst } from '@angular/compiler';
import { Component,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() toggleMySideBar:EventEmitter<any>  = new EventEmitter();
  toggleSidebar(){
    this.toggleMySideBar.emit();
 }
 isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  
}
