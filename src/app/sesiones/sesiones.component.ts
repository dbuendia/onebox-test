import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { SharingService } from '../services/sharing.service';
import { MusicEvent } from '../interfaces/music-event';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sesiones',
  templateUrl: './sesiones.component.html',
  styleUrls: ['./sesiones.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SesionesComponent {
  musicEvent: MusicEvent = {};
  eventId: number = 0;
  selectedTickets: number = 0;

  constructor(
    private sharingService: SharingService,
    private cdr: ChangeDetectorRef,
    private actRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getCurrentEvent();
  }

  setSelectedTicket(dateEvent: string, quantity: number, eventId?: string) {
      this.sharingService.updateMusicEvent(dateEvent, quantity, eventId);
}


  // Con esta función nos suscribimos al observable de details de la store y podemos leer nuestra variable local
  // Solo details!
  getCurrentEvent() {
    this.sharingService.getCurrentEvent.subscribe((event) => {
      this.musicEvent = event
      this.cdr.markForCheck();
    })
  }
}
