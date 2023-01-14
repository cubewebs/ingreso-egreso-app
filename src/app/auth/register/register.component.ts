import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Ngrx
import { Store } from '@ngrx/store';
import * as fromActions from '../../shared/ui.actions';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit{

	registroForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router,
		private store: Store
		) {
		this.registroForm = this.fb.group({
			nombre: ['', Validators.required],
			correo: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
		})
	}
	
	ngOnInit(): void {

	}

	get getNombre() {
	return this.registroForm.get('nombre')
	}

	get getCorreo() {
	return this.registroForm.get('correo')
	}

	get getPassword() {
	return this.registroForm.get('password')
	}

	crearUsuario() {
		this.store.dispatch(fromActions.isLoading())

		if( this.registroForm.invalid ) { return; };

		const { nombre, correo, password } = this.registroForm.value;
		this.authService.crearUsuario( nombre, correo, password )
		.then(credenciales => {
			this.store.dispatch(fromActions.stopLoading())
			console.log('credenciales ->', credenciales)
			this.router.navigate(['/'])
		})
		.catch( err => console.error('err ->', err))
	}

}
