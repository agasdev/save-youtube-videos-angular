import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public title: string;
  public status: string;
  public user: User;
  public identity: User;
  public token: string;

  constructor(private _userService: UserService, private _router: Router, private _route: ActivatedRoute) {
    this.title = 'Inicio de sesión';
    this.user = new User(1, '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit(): void {
    this.logout();
  }

  onSubmit(form): void {
    this.getLoginUser(form);
  }

  getLoginUser(form): void {
    this._userService.login(this.user).subscribe(
      response => {
        if (response.status === 'success') {
          this.identity = response.data;
          localStorage.setItem('identity', JSON.stringify(this.identity));
          this.getUserToken(form);
        } else {
          this.status = 'error';
          form.reset();
        }
      },
      error => {
        this.status = 'error';
        form.reset();
        console.log(error);
      }
    );
  }

  getUserToken(form): void {
    this._userService.login(this.user, true).subscribe(
      response => {
        if (response.status === 'success') {
          this.token = response.data;
          localStorage.setItem('token', this.token);
          this.status = 'success';
          this._router.navigate(['/home']);
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
    form.reset();
  }

  logout(): void {
    this._route.params.subscribe(params => {
      const sure = +params["sure"];

      if (sure === 1) {
        this._userService.logout();
        this._router.navigate(['/home']);
      }
    });
  }

}
