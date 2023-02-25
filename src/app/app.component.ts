import { Component } from '@angular/core';
import { SharingService } from './services/sharing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'onebox';

  constructor(
    private sharingService: SharingService,
    private router: Router
    ) {

  }

  // Al iniciarse la aplicación, seteamos todos los eventos
  ngOnInit() {
    this.sharingService.setMusicEvents();
  }
}
