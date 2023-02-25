export class Usuario {

	// static fromFirebase( { email, uid, displayName } ) {
	// 	return new Usuario( uid, displayName, email );
	// }
	
	constructor(
		public uid: string,
		public nombre: string,
		public email: string
	) {}
	
}