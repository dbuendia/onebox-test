import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ApiService } from '../services/api.service';
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
  // selectedTicket$: Observable<number>;

  // 3. Variable local con el contenido del observable
  selectedTicket: number = 0;

  constructor(
    private api: ApiService,
    // 1. Inyecto servicio
    private sharingService: SharingService,
    private cdr: ChangeDetectorRef) {
    //this.getMusicEvent();
    // 2. Me subcribo al servicio y accedo al contenido del observable en una variable local
    this.sharingService.getSelectedTicket.subscribe((value) => {
      this.selectedTicket = value;
    })
    // this.selectedTicket$ = sharingService.sharingSelectedTicket;
  }

  // 4. Setter
    setSelectedTicket(value: number) {
    //console.log(this.musicEvent.sessions?.[0].availability)
    // console.log(this.musicEvent);
     //this.musicEvent.sessions?.push({date: "DAO", availability: "dkasjdka"})
    if ((this.selectedTicket + value) < 0) {
      return;
    } else if ((this.selectedTicket + value) > Number(this.musicEvent.sessions?.[0].availability)) {
      return;
    } else {
      // 4. This.servicio.setter = this.variablelocal + valor
      this.sharingService.setSelectedTicket = this.selectedTicket + value;
    }
  }

  // 5. Si necesito varios observables, ¿creo un observable del contenido de todo el json?

  ngOnInit() {
    this.getMusicEvent(184);
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
    // this.sharingService.getEvents.subscribe((state) => {
    //   console.log(state);
    //});
  }
    // this.api.getMusicEvent()
    // .subscribe(res => {
    //   //this.cdr.detectChanges(); // FUNCIONAN LOS DOS PERO CREO QUE ES EL SEGUNDO
    //   this.cdr.markForCheck(); // IMPORTANTISIMO https://www.youtube.com/watch?v=JVuglXmslv4
    //   if (res.body !== null) {
    //     this.musicEvent = res.body;
    //   }
    // })
  }
