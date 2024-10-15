import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import {FormsModule} from "@angular/forms";
import { LoaderComponent } from './loader/loader.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, FormsModule,LoaderComponent]
})
export class AppComponent implements OnInit{
  title = 'newnw';


  ngOnInit(): void {

	initFlowbite();

  }

}

