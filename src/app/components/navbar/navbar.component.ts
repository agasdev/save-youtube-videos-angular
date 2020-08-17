import {Component, DoCheck, OnInit} from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {
  public identity: object;
  public token: string;

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.loadUser();
  }

  ngDoCheck(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
}
