import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

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
		private router: Router
		) {
		this.registroForm = this.fb.group({
			name: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
		})
	}
	
	ngOnInit(): void {

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

		Swal.fire({
			title: 'Please wait!',
			didOpen: () => {
			  Swal.showLoading()
			}
		  })

		const { name, email, password } = this.registroForm.value;
		this.authService.crearUsuario( name, email, password )
		.then(credenciales => {
			Swal.close();
			this.router.navigate(['/'])
		})
		.catch( err => {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: err.message
			  })
		})
	}

}
