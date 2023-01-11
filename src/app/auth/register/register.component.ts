import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit{

	registroForm: FormGroup;

	constructor(public fb: FormBuilder) {
		this.registroForm = this.fb.group({
			nombre: ['', Validators.required],
			correo: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(4)]],
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

	registrarUsuario() {
		console.log('this.registroForm.value ->', this.registroForm.value)
	}

}
