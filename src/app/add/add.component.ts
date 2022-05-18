import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {RequestService} from '../request.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  firstname: String = "";
  lastname: String = "";
  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private service: RequestService,
    private location: Location,
    private router: Router
  ) {
    this.currentUser = this.service.getCurrentUser();

    if (this.currentUser === null || this.currentUser === undefined) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
  }

  add(): void {
    let obj = {firstname: this.firstname, lastname: this.lastname}
    this.service.addPerson(this.currentUser.secret, obj).subscribe(
      result => {
        this.router.navigate(['/search']);
      }
    );
  }
}
