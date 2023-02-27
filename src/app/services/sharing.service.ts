import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MusicEvents } from '../interfaces/music-events';
import { MusicEvent } from '../interfaces/music-event';
import { Pedido } from '../interfaces/pedido';
const eventsUrl = "../../assets/data/events.json";

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  state: {
    events: MusicEvents[],
    details: MusicEvent,
    carrito: Pedido[]
  } = {events: [], details: {}, carrito: []};

  private events: BehaviorSubject<MusicEvents[]> = new BehaviorSubject<MusicEvents[]>(this.state.events);
  private details: BehaviorSubject<MusicEvent> = new BehaviorSubject<MusicEvent>(this.state.details);
  private carrito: BehaviorSubject<Pedido[]> = new BehaviorSubject<Pedido[]>(this.state.carrito);

  get getEvents() {
    return this.events.asObservable();
  }

  get getCurrentEvent() {
    return this.details.asObservable();
  }

  get getCarrito() {
    return this.carrito.asObservable();
  }

  constructor(private http: HttpClient) { }

  // 4. Esta función se llama en el ngOnInit de app.component.ts para setear todos los eventos al iniciar la app.
  // 4.1 (No inicializa ningún details)
  setMusicEvents() {
    this.http.get<MusicEvents[]>(eventsUrl, { observe: 'response' })
    .subscribe((res) => {
      this.state.events = res.body as MusicEvents[];
      this.events.next(this.state.events as MusicEvents[]);
    });
  }

  // 5. Esta función se llama al hacer click en un evento concreto desde sesiones.component.ts
  setMusicEvent(id: number) {
    this.setMusicEvents();
    this.http.get<MusicEvent>(`../../assets/data/event-info-${id}.json`, { observe: 'response' })
    .subscribe((res) => {
        const musicEvent = res?.body;

          let modifiedSessions = musicEvent?.sessions?.map((elem) => {
            return {...elem, selectedTickets: 0, id: musicEvent?.event.id}
          })

        this.state.details = {
          event: musicEvent?.event,
          sessions: modifiedSessions
        }
      this.details.next(this.state.details);
    },
    );
  }

  updateMusicEvent(dateEvent: string, quantity: number, eventId?: string) {
    const pedidoInCarrito = this.state.carrito.findIndex((pedido) => pedido.id === eventId)

    if(pedidoInCarrito >= 0) {
      this.state.carrito[pedidoInCarrito].sessions = this.state.carrito[pedidoInCarrito].sessions.map((session, i) => {
        if(session.date === dateEvent) {
          // Validation 1
          if ((session.selectedTickets + quantity) < 0 ) {
            return {
                ...session,
                selectedTickets: session.selectedTickets
            };
          }
          // Validation 2
          if ((session.selectedTickets + quantity) > Number(this.state.details.sessions[i].availability)) {
            return {
              ...session,
              selectedTickets: session.selectedTickets
          };
          }
          return {
            ...session,
            selectedTickets: quantity === 0 ? 0 : session.selectedTickets + quantity
          }
        }
          return session;
        })
        this.state.carrito = this.state.carrito.filter((pedido) => {
          const suma = pedido.sessions.reduce((acc, next) => {
            return (acc += next.selectedTickets)
          }, 0);
          return suma > 0
        })
    } else {
      const artistaNewPedido = {
        id: eventId,
        titulo: this.state.details.event.title,
        sessions: this.state.details.sessions.map((session) => {
          if(session.date === dateEvent) {
            return {
              ...session,
              selectedTickets: quantity,
              id: eventId,
            }
          }
          return session;
        })
      }
     this.state.carrito.push(artistaNewPedido);
    }
    this.carrito.next(this.state.carrito);
  }
}
