import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { SharingService } from '../services/sharing.service';
import { MusicEvent } from '../interfaces/music-event';

@Component({
  selector: 'app-sesiones',
  templateUrl: './sesiones.component.html',
  styleUrls: ['./sesiones.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SesionesComponent {
  musicEvent: MusicEvent = {};

  constructor(
    private sharingService: SharingService,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getCurrentEvent();
  }

  setSelectedTicket(dateEvent: string, quantity: number, eventId?: string) {
      this.sharingService.updateMusicEvent(dateEvent, quantity, eventId);
}

  getCurrentEvent() {
    this.sharingService.getCurrentEvent.subscribe((event) => {
      this.musicEvent = event
      this.cdr.markForCheck();
    })
  }
}
