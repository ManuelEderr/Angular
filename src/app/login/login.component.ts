import { Component, OnInit } from '@angular/core';
import { RequestResult } from '../requestResult';
import { RequestService } from '../request.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  username: String = "";
  currentUser: any;

  constructor(private service: RequestService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.service.getCurrentUser();

    if (this.currentUser !== null && this.currentUser !== undefined) {
      this.router.navigate(['/search']);
    }
  }

  login() {
    this.service.getUser(this.username).subscribe(
      result => {
        if (result.success) {
          window.localStorage.setItem("currentUser", JSON.stringify(result.data));
          this.router.navigate(['/search']);
        }
      }
    );
  }
}
