import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  public title: string;

  constructor() {
    this.title = 'Ajustes personales';
  }

  ngOnInit(): void {
  }

}
