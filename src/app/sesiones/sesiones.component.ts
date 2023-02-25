import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ApiService } from '../services/api.service';
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

  // 3. Variable local con el contenido del observable
  selectedTicket: number = 0;
  eventId: number = 0;

  constructor(
    private api: ApiService,
    // 1. Inyecto servicio
    private sharingService: SharingService,
    private cdr: ChangeDetectorRef,
    private actRoute: ActivatedRoute) {
    //this.getMusicEvent();
    // 2. Me subcribo al servicio y accedo al contenido del observable en una variable local
    // this.sharingService.getSelectedTicket.subscribe((value) => {
    //   this.selectedTicket = value;
    // })
    // this.selectedTicket$ = sharingService.sharingSelectedTicket;
  }

  // 4. Setter
  //   setSelectedTicket(value: number) {
  //   if ((this.selectedTicket + value) < 0) {
  //     return;
  //   } else if ((this.selectedTicket + value) > Number(this.musicEvent.sessions?.[0].availability)) {
  //     return;
  //   } else {
  //     this.sharingService.setSelectedTicket = this.selectedTicket + value;
  //   }
  // }

  // 5. Si necesito varios observables, ¿creo un observable del contenido de todo el json?

  // Este ID lo tendré que coger de la URL a la que accederé con cada botón
  ngOnInit() {
    this.eventId = this.actRoute.snapshot.params['id'];
    this.getMusicEvent(this.eventId);
  }

  // escoger id de la ruta y pasarlo por aqui
  // get music event devuelve una promesa, por eso el .then
  // la promesa nos devuelve el observable, para suscribirnos
  // y dentro del observable está el evento guuurl...
    getMusicEvent(id: number) {
      this.sharingService.getMusicEvent(id).then((stateSubscription) => {
        stateSubscription.subscribe((event) => {
          this.musicEvent = event;
          this.cdr.detectChanges(); // o this.cdr.markForCheck(); https://www.youtube.com/watch?v=JVuglXmslv4
        });
      })
    }
  }
