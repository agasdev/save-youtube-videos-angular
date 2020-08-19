import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-new',
  templateUrl: './video-new.component.html',
  styleUrls: ['./video-new.component.css']
})
export class VideoNewComponent implements OnInit {
  public title: string;

  constructor() {
    this.title = 'Añadir nuevo video';
  }

  ngOnInit(): void {
  }

}
