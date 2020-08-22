import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from '../../services/user.service';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video';

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
  public page: number;
  public nextPage: number;
  public prevPage: number;
  public numberPages: Array<number>;

  constructor(
    private _userService: UserService,
    private _videoService: VideoService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.title = 'Mis vídeos';
  }

  ngOnInit(): void {
    this.loadUser();
    this.actualPage();
  }

  actualPage(): void {
    this._route.params.subscribe(params => {
      let page: number = +params.page;
      if (!page) {
        page = 1;
        this.prevPage = 1;
        this.nextPage = 2;
      }
      this.getVideos(page);
    });
  }

  loadUser(): void {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getVideos(page): void {
    this._videoService.getVideos(this.token, page).subscribe(
      response => {
        if (response.status === 'success') {
          this.videos = response.videos;
          this.status = 'success';

          const numberPages: Array<number> = [];
          for (let i = 1; i <= response.totalPages; i++) {
            numberPages.push(i);
          }
          this.numberPages = numberPages;

          this.prevPage = page >= 2 ? page - 1 : 1;
          this.nextPage = page < response.totalPages ? page + 1 : response.totalPages;
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

  deleteVideo(videoId): void {
    this._videoService.delete(this.token, videoId).subscribe(
      respone => {
        this.actualPage();
      },
      error => {
        console.log(error);
      }
    );
  }
}
