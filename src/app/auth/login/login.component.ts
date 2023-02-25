import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Ngrx
import { Store } from '@ngrx/store';
import * as fromActions from '../../shared/ui.actions';
import * as fromSelectors from '../../shared/ui.selectors';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
	
	loginForm!: FormGroup;
	cargando: boolean = false;
	uiSubscriptions: Subscription[] = [];

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router,
		private store: Store<AppState>
	) {}

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			email: ['juan@testmail.com', [Validators.required, Validators.email]],
			password: ['123456', [Validators.required, Validators.minLength(6)]],
		});

		this.uiSubscriptions.push(
			this.store.select(fromSelectors.selectIsLoading).subscribe( isLoading => {
				this.cargando = isLoading;
			} )
		)
	}

	ngOnDestroy(): void {
		this.uiSubscriptions.forEach( s => s.unsubscribe())
	}

	login() {
		if(this.loginForm.invalid) return;
		this.store.dispatch(fromActions.isLoading())
		const { email, password } = this.loginForm.value
		this.authService.loginUsuario( email, password )
		.then((credentials) => {
			this.store.dispatch(fromActions.stopLoading())
			this.router.navigate(['/'])
		})
		.catch(err => {
			this.store.dispatch(fromActions.stopLoading())
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: err.message
			  })
		})
	}

}
