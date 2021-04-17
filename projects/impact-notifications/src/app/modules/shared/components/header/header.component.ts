import { Component, EventEmitter, Input, Output  } from '@angular/core';

@Component({
  selector: 'app-root-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  @Input() isOpen: boolean;
  @Output() openEvent = new EventEmitter<boolean>();
  
  toggle() {
    this.openEvent.emit(this.isOpen = !this.isOpen);
  }
}
