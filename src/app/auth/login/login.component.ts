import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Ngrx
import { Store } from '@ngrx/store';
import * as fromActions from '../../shared/ui.actions';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
	
	loginForm!: FormGroup;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router,
		private store: Store
	) {}

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			email: ['juaon@mail.com', [Validators.required, Validators.email]],
			password: ['123456', [Validators.required, Validators.minLength(6)]],
		})
	}

	login() {
		if(this.loginForm.invalid) return;
		this.store.dispatch(fromActions.isLoading())
		Swal.fire({
			title: 'Please wait!',
			didOpen: () => {
			  Swal.showLoading()
			}
		  })
		const { email, password } = this.loginForm.value
		this.authService.loginUsuario( email, password )
		.then((credentials) => {
			Swal.close();
			this.router.navigate(['/'])
		})
		.catch(err => {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: err.message
			  })
		})
	}

}
