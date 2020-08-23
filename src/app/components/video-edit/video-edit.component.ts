import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video';

@Component({
  selector: 'app-video-edit',
  templateUrl: '../video-new/video-new.component.html',
  styleUrls: ['./video-edit.component.css'],
  providers: [UserService, VideoService]
})
export class VideoEditComponent implements OnInit {
  public pageTitle: string;
  public identity: any;
  public token: string;
  public video: Video;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _videoService: VideoService
  ) {
    this.pageTitle = 'Editar video';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      const videoId: number = +params.id;
      this.getVideo(videoId);
    });
  }

  getVideo(id: number): void {
    this._videoService.getVideo(this.token, id).subscribe(
      response => {
        if (response.status === 'success') {
          this.video = response.video;
        } else {
          this._router.navigate(['/home']);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(form): void {
    this._videoService.update(this.token, this.video).subscribe(
      response => {
        if (response.status === 'success') {
          this.status = 'success';
          form.reset();
          this._router.navigate(['/home']);
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    );
  }
}
