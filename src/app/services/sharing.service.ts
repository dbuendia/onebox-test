import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MusicEvents } from '../interfaces/music-events';
import { MusicEvent } from '../interfaces/music-event';
const eventsUrl = "../../assets/events.json";
const event68Url = "../../assets/event-info-68.json";
const event184Url = "../../assets/event-info-184.json";

// 1. Para poder trabajar con los datos del JSON y observables, creo un servicio.

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  // 2. Vamos a eecuperar todo el json en un objeto local como estado.
  // TODO: Tengo que añadir la interfaz de todos los eventos.
  state: {
    events?: {[key: string] : any}[], // {interfaz}[]
    details: {[key: string] : MusicEvent}
  } = { events: [], details: {}};

  private selectedTicket: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  get getSelectedTicket() {
    return this.selectedTicket.asObservable();
  }

  set setSelectedTicket(data: number) {
    this.selectedTicket.next(data);
  }

  private events: BehaviorSubject<{[key: string]: any}[]> = new BehaviorSubject<{[key: string]: any}[]>(this.state.events as any);
  private currentEvent: BehaviorSubject<MusicEvent> = new BehaviorSubject<MusicEvent>({});

  get getEvents() {
    return this.events.asObservable();
  }

  get getCurrentEvent() {
    return this.currentEvent.asObservable();
  }

  constructor(private http: HttpClient) { }

  // Esta función se llama en el ngOnInit de app.component.ts
  setMusicEvents() {
    this.http.get<MusicEvent>(eventsUrl, { observe: 'response' })
    .subscribe((res) => {
      // Meter la interfaz
      this.state.events = res.body as any;
      this.events.next(this.state.events as any);
    });
  }

  // Por qué este método tiene que ser async await??
  async getMusicEvent(id: number): Promise<Observable<MusicEvent>> {
    const res = await this.http.get<MusicEvent>(`../../assets/event-info-${id}.json`, { observe: 'response' }).toPromise()
    if (this.state.details) {
      this.state.details[`id${id}`] = res?.body as MusicEvent;
    }
    this.currentEvent.next(this.state.details[`id${id}`]);
    return this.getCurrentEvent;
  }


}
