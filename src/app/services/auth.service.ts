import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
	private fs: Firestore,
	private auth: AngularFireAuth,
  ) { }

  initAuthListener() {
	this.auth.authState.subscribe( fuser => {
		console.log('fuser ->', fuser);
		console.log('fuser ->', fuser?.uid);
		console.log('fuser ->', fuser?.email);
	})
  }
	
	crearUsuario( displayName: string, email: string, password: string) {

		return this.auth.createUserWithEmailAndPassword(email, password)
				.then(() => {
					const user = {displayName, email, password}
					const userRef = collection( this.fs, 'users');
					addDoc(userRef, user)
				})
				.catch( err => console.log('err ->', err))

	}

	loginUsuario( email: string, password: string ) {
		return this.auth.signInWithEmailAndPassword( email, password );
	}

	logout() {
		return this.auth.signOut();
	}

	isAuth() {
		return this.auth.authState.pipe(
			map( fuser => fuser != null)
		)
	}

	getUsers(): Observable<User[]> {
		const userRef = collection( this.fs, 'users')
		return collectionData( userRef, { idField: 'uid'}) as Observable<User[]>
	}

}
