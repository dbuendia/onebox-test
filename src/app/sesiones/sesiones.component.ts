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

  constructor(
    private sharingService: SharingService,
    private cdr: ChangeDetectorRef,
    private actRoute: ActivatedRoute) {
  }

  ngOnInit() {
    // this.sharingService.setMusicEvent(this.actRoute.snapshot.params['id'])
    this.getCurrentEvent();
  }
  
  setSelectedTicket(dateEvent: string, quantity: number) {
    // TENGO QUE VER LAS ENTRADAS SELECCIONADAS
    // TENGO QUE IR A SESION CON EL DATE EVENT Y SELECTED TICKET

    // what is this actually doing? selectedEVent is not being used
    // const selectedEvent = this.musicEvent.sessions?.filter((elem) => {
    //   if (elem.date === dateEvent) {
    //   return true;
    //   } else {
    //     return false;
    //   }
    // });

    // QUERIA PUTO MIRARLO ANTES DE UPDATE, pero no se. Esrto no pinta bien
    // if(selectedEvent?.[0].selectedTickets) {
    //   console.log((selectedEvent?.[0].selectedTickets + quantity) <= 0);
    // }
      this.sharingService.updateMusicEvent(dateEvent, quantity);
}


  // Con esta función nos suscribimos al observable de details de la store y podemos leer nuestra variable local
  // Solo details!
  getCurrentEvent() {
    this.sharingService.getCurrentEvent.subscribe((event) => {
      // Hay que borrar de la store ANTES de llamar a esta función (porque si no me traigo datos malos)
      //console.log(event);
      this.musicEvent = event
      // this.musicEvent.sessions;
      this.cdr.markForCheck();
      // this.cdr.detectChanges(); // o this.cdr.markForCheck(); https://www.youtube.com/watch?v=JVuglXmslv4
    })
  }
}
