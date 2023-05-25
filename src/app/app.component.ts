import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'services-project';
  isMenuOpen = false;
  toggleMenu(): void{
    this.isMenuOpen = !this.isMenuOpen;
  }

  checkWindowWidth(): void {
    let dropdownContainer = document.querySelector(".dropdown_container") as HTMLDivElement;
    if (window.innerWidth <= 700) {
      this.toggleMenu();
    } else {
      dropdownContainer.classList.remove('open');
    }
  }

  ngOnInit(): void {
    this.checkWindowWidth();
    window.addEventListener('resize', () => {
      this.checkWindowWidth();
    });
  }

}

