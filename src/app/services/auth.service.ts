import { Injectable } from '@angular/core';

import { User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';

import { map, Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
	private fs: Firestore,
	private afs: AngularFirestore,
	private auth: AngularFireAuth,
	private store: Store<AppState>
  ) { }

  initAuthListener() {
	this.auth.authState.subscribe( fuser => {
		console.log('fuser ->', fuser?.uid);
		if( fuser ) {
			// user existe
			this.afs.doc(`${ fuser.uid }/users`).valueChanges()
				.subscribe( fsUser => {
					console.log('fsUser ->', fsUser)
					// const user = Usuario.fromFirebase( fsUser )
					// this.store.dispatch( authActions.setUser({ user: user }))
				})
		} else {
			// user no existe
			console.log('Llamar unSetUser del user ->' )
		}
		// this.store.dispatch( authActions.setUser() )
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
