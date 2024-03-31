import { User } from '../../models/user.model';
import { UsersService } from './../../services/users.service';
import { Component } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';

import { SearchPipe } from '../../pipes/search.pipe';
import { Router } from '@angular/router';
import { AngularMaterialModule } from '../../../shared/angular-material.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
  AngularMaterialModule,
    SearchPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private usersService: UsersService , private router:Router) {}
  allUsers: User[] = [];
  pageSize = 6;
  pageNumber: number = 1;
  loading = false;
  
  ngOnInit() {
    // get all users from the service
    this.getAllUsers(this.pageNumber);
  }

  getAllUsers(pageNumber: number) {
    // get all users from the service
    this.loading = true; // set loading to true
    this.usersService.getAllUsers(pageNumber).subscribe({
      next: (data) => {
        this.allUsers = data.data;
        this.loading = false; // set loading to false
          localStorage.setItem('users', JSON.stringify(this.allUsers)); // store the users in the local storage
      },
      error: (error) => {
        // handling error
        console.log(error); 
        this.loading = false;
      },
      complete: () => {
        this.usersService.pageNumber.next(this.pageNumber); // update the pageNumber observable to get new users on page change for header component
      },
    });
  }

  onPageChange(event: PageEvent) {
    // get all users on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.pageNumber = event.pageIndex + 1;
    this.getAllUsers(this.pageNumber);
    
  }

  getUserDetails(id: number) {
    // redirect to the user details page
    this.router.navigate(['/user', id]);
  }
}
