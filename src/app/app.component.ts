import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface ImageResponse {
  image: ImageData;
  id: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  image: ImageData;
  imageId: string;
  showWarning = true;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getImage();
  }

  getImage() {
    this.http.get('/get_image').subscribe((response: ImageResponse) => {
      if (response.image) {
        this.image = response.image;
        this.imageId = response.id;
      }
    });
  }

  saveResult(result) {
    console.log('saveResult', result);
    this.http.post('/save_verdict', {image_id: this.imageId, verdict: result}).subscribe(response => {
      this.getImage();
    });
  }

  keyPress(event) {
    console.log(event);
    if (event.key === '1') {
      this.saveResult(1);
    }
    if (event.key === '2') {
      this.saveResult(0);
    }
    if (event.key === '3') {
      this.saveResult(-1);
    }
  }

}
