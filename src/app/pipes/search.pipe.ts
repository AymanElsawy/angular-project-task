import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(users: User[], search: number): User[] {
    if (search == 0) {
      return users;
    }
    return users.filter((user) => {
      if (user.id == search ) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
