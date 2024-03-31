import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AngularMaterialModule } from '../../../shared/angular-material.module';


@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    AngularMaterialModule
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent {
  currentUser = {} as User;
  userId!: number;
  loading = false;
  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    // get the user id from the url
    this.route.paramMap.subscribe((params) => {
      this.userId = +params.get('id')!;
      this.getUserDetails(this.userId); // get the user details
    });
  }

  getUserDetails(id: number) {
    // get the user details
    this.loading = true; // set loading to true
    this.usersService.getUserById(id).subscribe({
      next: (data) => {
        this.currentUser = data.data;
        this.loading = false;
      },
      error: (error) => {
        // handling error
        console.log(error);
      }
    });
  }

  goBack() {
    // redirect to the home page
    this.router.navigate(['/']);
  }
}
