import {Component, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {UserService} from "../services/user.service";
import {CommonModule} from "@angular/common";
import {User} from "../../shared/models/User";
import { LoaderComponent } from '../loader/loader.component';


@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.css',
    imports: [
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        CommonModule,
		LoaderComponent
    ]
})
export class AdminDashboardComponent implements OnInit{
  isDropdownVisible: boolean = false;
  isSidebarHidden = true;
  protected user : User = this.userService.getUser();
  protected sidebarLinks = [
    { route: 'charts', label: 'Dashboard', icon: 'fa-solid fa-house' },
    { route: 'filieres', label: 'Filières', icon: 'fa-solid fa-school' },
    { route: 'modules', label: 'Modules', icon: 'fa-solid fa-books' },
    { route: 'enseignants', label: 'Enseignantes', icon: 'fa-solid fa-chalkboard-user' },
    { route: 'interventions', label: 'Interventions', icon: 'fa-solid fa-book-open-cover' }
  ];

  constructor(private userService: UserService, private eRef: ElementRef) {}



  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
  @HostListener('document:click', ['$event'])
  clickout(event: { target: any; }) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isDropdownVisible = false;
    }
  }
  logout(){
    this.userService.logout();
  }

  ngOnInit() {}
}
