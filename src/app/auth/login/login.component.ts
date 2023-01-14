import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Ngrx
import { Store } from '@ngrx/store';
import * as fromActions from '../../shared/ui.actions';
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

	loginUsuario() {
		if(this.loginForm.invalid) return;
		this.store.dispatch(fromActions.isLoading())
		const { email, password } = this.loginForm.value
		this.authService.loginUsuario( email, password )
		.then((credentials) => {
			this.store.dispatch(fromActions.stopLoading())
			console.log('credentials ->', credentials)
			this.router.navigate(['/'])
		})
		.catch(err => console.log('err ->', err))
	}

}
