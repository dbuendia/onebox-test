import { Component } from '@angular/core';
import { SharingService } from './services/sharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'onebox';

  constructor(
    private sharingService: SharingService
    ) {

  }

  ngOnInit() {
    this.sharingService.setMusicEvents();
  }
}
