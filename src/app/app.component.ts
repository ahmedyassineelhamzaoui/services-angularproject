import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'services-project';
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
      dropdownContainer.classList.remove('open');
    }
  }
  clickNext(): void{
    let firstSlide=document.querySelector('#first-slide') as HTMLDivElement;
    let secondSlide=document.querySelector('#second-slide') as HTMLDivElement;
    let thirdSlide=document.querySelector('#third-slide') as HTMLDivElement;
    let curentBtn=document.querySelectorAll('.curent-btn')

    if(this.compt<2){
     this.compt++
        curentBtn[this.compt].classList.add('active-caroseile')
        curentBtn[this.compt-1].classList.remove('active-caroseile')
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
        curentBtn[this.compt+2].classList.remove('active-caroseile')
        curentBtn[this.compt].classList.add('active-caroseile')
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
  clickPrevious(): void{
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
  skipStep():void {
    setInterval((): void => {
      this.clickNext();
    }, 7000);  
  }
  ngOnInit(): void {
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

