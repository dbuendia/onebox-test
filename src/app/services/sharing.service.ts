import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MusicEvents } from '../interfaces/music-events';
import { MusicEvent } from '../interfaces/music-event';
const eventsUrl = "../../assets/data/events.json";

// 1. Para poder trabajar con los datos del JSON y observables, creo un servicio.
@Injectable({
  providedIn: 'root'
})
export class SharingService {
  // 2. Vamos a recuperar todo el json en un objeto local como estado.
  // TODO: Tengo que añadir la interfaz de todos los eventos.

  state: {
     events?: MusicEvents[], // {interfaz}[]
    //events?: {events: MusicEvents}[],
    details: {[key: string] : MusicEvent}
  } = {events: [], details: {}};

  // private selectedTicket: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  // get getSelectedTicket() {
  //   return this.selectedTicket.asObservable();
  // }
  // set setSelectedTicket(data: number) {
  //   this.selectedTicket.next(data);
  // }

  // 3. Creo un BehavourSubject para contener los eventos
  // TODO: Añadir la interfaz
  //private events: BehaviorSubject<{[key: string]: any}[]> = new BehaviorSubject<{[key: string]: any}[]>(this.state.events as any);
  private events: BehaviorSubject<MusicEvents[]> = new BehaviorSubject<MusicEvents[]>(this.state.events as MusicEvents[]);
  private currentEvent: BehaviorSubject<MusicEvent> = new BehaviorSubject<MusicEvent>({});

  // 4. Convertimos el array de eventos en observable
  get getEvents() {
    return this.events.asObservable();
  }

  get getCurrentEvent() {
    return this.currentEvent.asObservable();
  }

  constructor(private http: HttpClient) { }

  // 5. Esta función se llama en el ngOnInit de app.component.ts para setear todos los eventos al iniciar la app
  setMusicEvents() {
    this.http.get<MusicEvents[]>(eventsUrl, { observe: 'response' })
    .subscribe((res) => {
      this.state.events = res.body as MusicEvents[];
      this.events.next(this.state.events as MusicEvents[]);
    });
  }

  // Me devuelve un MusicEvent en base a su ID
  // Por qué este método tiene que ser async await??
  async getMusicEvent(id: number): Promise<Observable<MusicEvent>> {
    const res = await this.http.get<MusicEvent>(`../../assets/data/event-info-${id}.json`, { observe: 'response' }).toPromise()
    if (this.state.details) {
      this.state.details[`id${id}`] = res?.body as MusicEvent;
    }
    this.currentEvent.next(this.state.details[`id${id}`]);
    return this.getCurrentEvent;
  }

  // get entrada seleccionada
  // delete entrada seleccionada


}
