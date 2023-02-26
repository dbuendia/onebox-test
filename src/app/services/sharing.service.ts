import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MusicEvents } from '../interfaces/music-events';
import { MusicEvent } from '../interfaces/music-event';
import { Carrito } from '../interfaces/carrito';
const eventsUrl = "../../assets/data/events.json";


@Injectable({
  providedIn: 'root'
})
export class SharingService {
  // 1. Vamos a recuperar todo el json en un objeto local como estado.
  state: {
    events?: MusicEvents[],
    details: MusicEvent,
    carrito: Carrito[]
  } = {events: [], details: {}, carrito: []};

  // 2. Creo un BehavourSubject para contener los eventos
  private events: BehaviorSubject<MusicEvents[]> = new BehaviorSubject<MusicEvents[]>(this.state.events as MusicEvents[]);
  private details: BehaviorSubject<MusicEvent> = new BehaviorSubject<MusicEvent>(this.state.details as MusicEvent);
  private carrito: BehaviorSubject<Carrito[]> = new BehaviorSubject<Carrito[]>(this.state.carrito);

  selectedTicket: number = 0;

  // 3. Convertimos los array de eventos en observables
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
    //.pipe(catchError(elem: any))
    .subscribe((res) => {

        const musicEvent = res?.body;
        let modifiedSessions: any;
        // No podemos setear en 0 directamente, porque si no se borran los datos y necesitamos que se mantengan.
        // tengo que añadir esta propiedad igualmente, eso sí.
        // Puedo añadirla solo si no existe?
        // SI SELECTED TICKETS NO EXISTE:
        musicEvent?.sessions?.map((elem) => {
          console.log(elem.selectedTickets === undefined)
          // AÑADO LA PROPIEDAD EN 0
          if (elem.selectedTickets === undefined) {
          modifiedSessions = musicEvent?.sessions?.map((elem) => {
            return {...elem, selectedTickets: 0}
          })
        } else {
          // NUNCA LLEGO A ESTE CONSOLE LOG!!! Por que?
          console.log("selected tickets ya existe")
          modifiedSessions = musicEvent?.sessions;
        }
      });
        // modifiedSessions = musicEvent?.sessions?.map(
        //   (elem) => {
        //   return { ...elem, selectedTickets: 0}
        // })

        // const noModifiedSessions = musicEvent?.sessions;

        // Quiero tener los details que haya ido seleccionado siempre.
        this.state.details = {
          event: musicEvent?.event,
          sessions: modifiedSessions
        }


      this.details.next(this.state.details);

    },
    // Si la respuesta de la API no existe, seteo los details en {}
    //err => {console.log(err); this.details.next(this.state.details = {})},
    //() => console.log('HTTP request completed.')
    );
  }


  updateMusicEvent(dateEvent: string, quantity: number) {


     // le logic for not choosing validacion cheesy
    // const updatedMusicEvent = this.state.details?.sessions?.map((elem) => {
    //   if (elem.date === dateEvent) {
    //     // si ya es 0, no dejamos que baje mas
    //     if((elem.selectedTickets + quantity) < 0) { return elem }

    //     if((elem.selectedTickets + quantity) > Number(elem.availability)) {
    //       return elem;
    //     }
    //     return { ...elem, selectedTickets: elem.selectedTickets + quantity };
    //   }
    //   return elem;
    // });

    if(this.state.carrito.length > 0) {

    const newPedidos = this.state.carrito.map((pedido) => {
      if(pedido.titulo === this.state.details.event?.title) {
        const selectedSession = pedido.sessions?.map((detail) => {
          if(detail.date === dateEvent) {
            return {
              ...detail,
              selectedTickets: (detail?.selectedTickets || 0) + quantity
            }
          }
          return detail;
        })
        return {
          ...pedido,
          sessions: selectedSession
        }
      } else {
        return pedido;
      }
    })
    this.state.carrito = newPedidos;

  } else {
     const pedido = {
      titulo: this.state.details.event?.title,
      sessions: [{
        date: dateEvent,
        selectedTickets: quantity
      }]
    }
    this.state.carrito.push(pedido)
  }

  debugger;


    // console.log(newPedidos)


    // titulo: string;
    // sessions: {
    //     date: string;
    //     selectedTickets: number
    // }[]
    // const pedido = {
    //   titulo: this.state.details.event?.title,
    //   sessions
    // }
    // this.state.carrito.push(pedido)
    // // this.state.details.sessions = updatedMusicEvent;
    // this.details.next(this.state.details); ???????

  }
}
