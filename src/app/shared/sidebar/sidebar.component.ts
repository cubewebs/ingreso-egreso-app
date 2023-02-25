import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromSelectors from '../ui.selectors';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
	private store: Store
  ) {}

  ngOnInit(): void {
	 
  }

  logout() {

    this.authService.logout().then( () => {
      this.router.navigate(['/login'])
    })

  }

}
