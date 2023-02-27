import { MusicEvents } from 'src/app/interfaces/music-events';
import { SharingService } from 'src/app/services/sharing.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.css']
})
export class CarteleraComponent {
    events: MusicEvents[] = [];

    constructor(private sharingService: SharingService) {
    }

    ngOnInit() {
      this.getEvents();
    }

    getEvents() {
      this.sharingService.getEvents.subscribe((events) => {
        events.sort((a, b) => {
          return a.endDate >= b.endDate ? 1 : -1
      });
      if (events.length) {
        this.events = events;
      }
    })
  }
}
