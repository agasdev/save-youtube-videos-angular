import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
  providers: [UserService, VideoService]
})
export class VideoDetailComponent implements OnInit {
  public identity: any;
  public token: string;
  public video: Video;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _videoService: VideoService,
    private _sanitizer: DomSanitizer
  ) {
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

  getVideoIframe(url): any {
    let video: string;
    let results: string;

    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];

    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
  }

}
