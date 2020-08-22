import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { VideoService } from '../../services/video.service';
import {Video} from '../../models/video';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService, VideoService]
})
export class HomeComponent implements OnInit {
  public title: string;
  public identity: object;
  public token: string;
  public status: string;
  public videos: Array<Video>;

  constructor(private _userService: UserService, private _videoService: VideoService) {
    this.title = 'Mis vídeos';
  }

  ngOnInit(): void {
    this.loadUser();
    this.getVideos();
  }

  loadUser(): void {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getVideos(): void {
    this._videoService.getVideos(this.token).subscribe(
      response => {
        if (response.status === 'success') {
          this.status = 'success';
          this.videos = response.videos;
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    );
  }

  getThumb(url, size): string {
    let video: string;
    let results: string;
    let thumburl: string;

    if (url === null) {
      return '';
    }

    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];

    if (size !== null) {
      thumburl = 'http://img.youtube.com/vi/' + video + '/' + size + '.jpg';
    }else{
      thumburl = 'http://img.youtube.com/vi/' + video + '/mqdefault.jpg';
    }

    return thumburl;

  }
}
