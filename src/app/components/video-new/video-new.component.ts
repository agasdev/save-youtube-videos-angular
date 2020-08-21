import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Video } from '../../models/video';

@Component({
  selector: 'app-video-new',
  templateUrl: './video-new.component.html',
  styleUrls: ['./video-new.component.css'],
  providers: [UserService]
})
export class VideoNewComponent implements OnInit {
  public title: string;
  public identity: any;
  public token: string;
  public video: Video;
  public status: string;

  constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService) {
    this.title = 'Añadir nuevo video';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.video = new Video(1, this.identity.sub, '', '', '', '', null, null);
  }

  ngOnInit(): void {
  }

  onSubmit(form): void {
    console.log(this.video);
  }
}
