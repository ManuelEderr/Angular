import {Component, OnInit} from '@angular/core';
import {RequestService} from '../request.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  name: String = "";
  currentUser: any;

  constructor(private service: RequestService, private router: Router) {
    this.currentUser = this.service.getCurrentUser();

    if (this.currentUser === null || this.currentUser === undefined) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
  }

  search() {
    this.service.searchPerson(this.currentUser.secret, this.name).subscribe(
      result => {
        if (result.success && result.data.length > 0) {
          this.service.setSearchData(result.data);
          this.router.navigate(['/list']);
        } else {
          this.router.navigate(['/add']);
        }
      }
    );

  }

  logout() {
    this.service.logout(this.currentUser.secret).subscribe(
      result => {
        console.log(result);
        localStorage.removeItem("currentUser");

        this.router.navigate(['/login']);
      }
    );
  }
}
