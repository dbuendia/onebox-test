import { MusicEvents } from 'src/app/interfaces/music-events';
import { SharingService } from 'src/app/services/sharing.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.css']
})
export class CarteleraComponent {
    // Creo variable para recibir los eventos
    // Tengo que meter la interfaz
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
    // getMusicEvent(id: number) {
    //   this.sharingService.getMusicEvent(id).then((stateSubscription) => {
    //     stateSubscription.subscribe((event) => {
    //       this.musicEvent = event;
    //       this.cdr.detectChanges(); // o this.cdr.markForCheck(); https://www.youtube.com/watch?v=JVuglXmslv4
    //     });
    //   })
    // }
  
}
