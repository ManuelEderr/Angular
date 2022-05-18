import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RequestService} from "../request.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  currentUser: any;
  data: any[] = [];

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

    this.data = this.service.getSearchData();
  }

  ngOnInit(): void {

  }

  back() {
    this.location.back();
  }
}
