import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) {}

  isMenuOpen = false;
  compt:number = 0;

  toggleMenu(): void{
    this.isMenuOpen = !this.isMenuOpen;
  }

  checkWindowWidth(): void {
    let dropdownContainer = document.querySelector(".dropdown_container") as HTMLDivElement;
    if (window.innerWidth <= 700) {
      this.toggleMenu();
    } else {
      if(dropdownContainer){
        dropdownContainer.classList.remove('open');
      }
    }
  }
 
  clickNext(): void{
    if( this.router.url === '/' ||  this.router.url === '/login'){
  
    let firstSlide=document.querySelector('#first-slide') as HTMLDivElement;
    let secondSlide=document.querySelector('#second-slide') as HTMLDivElement;
    let thirdSlide=document.querySelector('#third-slide') as HTMLDivElement;
    let curentBtn=document.querySelectorAll('.curent-btn')

    if(this.compt<2){
     this.compt++
     if(curentBtn[this.compt]){
      curentBtn[this.compt].classList.add('active-caroseile')
      curentBtn[this.compt-1].classList.remove('active-caroseile')
     }
        if(this.compt==1){
            firstSlide.style.display="none"
            secondSlide.style.display="block"
        }else if(this.compt==2){
            secondSlide.style.display="none"
            thirdSlide.style.display="block"
        }else{
            thirdSlide.style.display="none"
            firstSlide.style.display="block"
        }
    }else{
        this.compt=0
        if(curentBtn){
          curentBtn[this.compt+2].classList.remove('active-caroseile')
          curentBtn[this.compt].classList.add('active-caroseile')
        }
        if(this.compt==1){
            firstSlide.style.display="none"
            secondSlide.style.display="block"
        }else if(this.compt==2){
            secondSlide.style.display="none"
            thirdSlide.style.display="block"
        }else{
            thirdSlide.style.display="none"
            firstSlide.style.display="block"
        }   
    }
  }
}
  clickPrevious(): void{
    if( this.router.url === '/' ||  this.router.url === '/login'){
      
      let firstSlide=document.querySelector('#first-slide') as HTMLDivElement;
      let secondSlide=document.querySelector('#second-slide') as HTMLDivElement;
      let thirdSlide=document.querySelector('#third-slide') as HTMLDivElement;
      let curentBtn=document.querySelectorAll('.curent-btn')
      if(this.compt>0){
      this.compt--
          curentBtn[this.compt+1].classList.remove('active-caroseile')
          curentBtn[this.compt].classList.add('active-caroseile')
          if(this.compt==2){
              thirdSlide.style.display="block"
              firstSlide.style.display="none"
          }else if(this.compt==1){
              secondSlide.style.display="block"
              thirdSlide.style.display="none"
          }else{
              firstSlide.style.display="block"
              secondSlide.style.display="none"
          }
      }else{
          this.compt=2;
          curentBtn[this.compt-2].classList.remove('active-caroseile')
          curentBtn[this.compt].classList.add('active-caroseile')

          if(this.compt==2){
              thirdSlide.style.display="block"
              firstSlide.style.display="none"
          }else if(this.compt==1){
              secondSlide.style.display="block"
              thirdSlide.style.display="none"
          }else{
              firstSlide.style.display="block"
              secondSlide.style.display="none"
          }
      }      
      }
  }
  skipStep():void {
    setInterval((): void => {
      this.clickNext();
    }, 7000);  
  }
  ngOnInit(): void {
    if( this.router.url === '/' ||  this.router.url === '/login'){
      
    let mainBody = document.querySelector('.main-body') as HTMLElement;
    let devImages = document.querySelectorAll('.dev-images') ;
    let navBar = document.querySelector('.navbar') as HTMLElement ;
    this.skipStep();
    this.checkWindowWidth();
    window.addEventListener('scroll', () => {
      navBar.style.backgroundColor="rgba(0, 9, 64, 0.6)";
      if(window.scrollY == 0){
      navBar.style.backgroundColor="transparent";
      }
    });
    window.addEventListener('resize', () => {
      this.checkWindowWidth();
    });
  }      
  }
}
