import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Ngrx
import { Store } from '@ngrx/store';
import * as fromActions from '../../shared/ui.actions';
import * as fromSelectors from '../../shared/ui.selectors';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit{

	registroForm: FormGroup;
	cargando: boolean = false;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router,
		private store: Store<AppState>
		) {
		this.registroForm = this.fb.group({
			name: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
		})
	}
	
	ngOnInit(): void {

		this.store.select(fromSelectors.selectIsLoading)
			.subscribe( is => this.cargando = is )

	}

	get getNombre() {
	return this.registroForm.get('name')
	}

	get getCorreo() {
	return this.registroForm.get('email')
	}

	get getPassword() {
	return this.registroForm.get('password')
	}

	crearUsuario() {
		
		if( this.registroForm.invalid ) { return; };
		
		this.store.dispatch(fromActions.isLoading())

		const { name, email, password } = this.registroForm.value;
		this.authService.crearUsuario( name, email, password )
		.then(credenciales => {
			this.store.dispatch(fromActions.stopLoading())
			console.log('credenciales ->', credenciales)
			this.router.navigate(['/'])
		})
		.catch( err => {
			this.store.dispatch(fromActions.stopLoading())
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: err.message
			  })
		})
	}

}
