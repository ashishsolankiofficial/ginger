import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css']
})
export class RestaurantFormComponent implements OnInit {

  ext_id: string;
  isAdd: boolean;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.ext_id = this.route.snapshot.params['ext_id']
    this.isAdd = !this.ext_id

  }

}
