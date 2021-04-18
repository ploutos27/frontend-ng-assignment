import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'root-app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit{
  open = true;

  ngOnInit() {
    this.checkScreenSize(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.checkScreenSize(event.target.innerWidth);
  }

  private checkScreenSize(innerWidth: number) {
    if(innerWidth < 600) {
      this.open = false;
    } else {
      this.open = true;
    }
  }
}