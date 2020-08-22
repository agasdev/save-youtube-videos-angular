import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from '../models/video';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = global.URL;
  }

  create(token: string, video: Video): Observable<any> {
    const params = 'json=' + JSON.stringify(video);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                     .set('Authorization', token);

    return this._http.post(this.url + 'video', params, {headers});
  }

  getVideos(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                     .set('Authorization', token);

    return this._http.get(this.url + 'videos', {headers});
  }

  getVideo(token: string, videoId: number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                     .set('Authorization', token);

    return this._http.get(this.url + 'video/' + videoId, {headers});
  }

  update(token: string, video: Video): Observable<any> {
    const params = 'json=' + JSON.stringify(video);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                     .set('Authorization', token);

    return this._http.put(this.url + 'video/' + video.id, params, {headers});
  }

  delete(token: string, videoId: number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                     .set('Authorization', token);

    return this._http.delete(this.url + 'video/' + videoId, {headers});
  }
}
