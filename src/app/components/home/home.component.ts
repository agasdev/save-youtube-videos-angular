import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public title: string;
  public identity: object;
  public token: string;

  constructor(private _userService: UserService) {
    this.title = 'Inicio';
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

}
