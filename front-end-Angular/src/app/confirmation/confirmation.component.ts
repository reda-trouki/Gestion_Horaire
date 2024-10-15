import { Component, EventEmitter, Input, Output } from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {
  @Input() show = false;
  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();
}
