import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  users$: Observable<User[]> = new Observable<User[]>();
  users: User[] = [];

  constructor(
    private authService: AuthService,
    private firestore: Firestore
  ) {}
  ngOnInit(): void {
    this.users$ = this.authService.getUsers()
  }


}
