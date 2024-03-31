import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../../shared/angular-material.module';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { SearchPipe } from '../../pipes/search.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AngularMaterialModule, CommonModule, SearchPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  searchId: number = 0;
  users!: User[];
  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit() {
    // subscribe to the pageNumber observable to update the users
    this.usersService.pageNumber.subscribe((value) => {
      this.getUsers();
    });
  }
  getUsers() {
    // get the users from the local storage
    const users = localStorage.getItem('users');
    if (users) {
      this.users = JSON.parse(users);
    }
  }
  searchUser(event: any) {
    // search for a user by id
    this.searchId = event.target.value;
  }

  getUserDetails(id: number) {
    // redirect to the user details page
    this.router.navigate(['/user', id]);
  }
}
