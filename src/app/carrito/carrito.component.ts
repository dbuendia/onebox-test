import { Carrito } from './../interfaces/carrito';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { SharingService } from '../services/sharing.service';
import { MusicEvent } from '../interfaces/music-event';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarritoComponent {

  musicEvent: MusicEvent = {};
  carrito: Carrito[] = [];

  constructor(public sharingService: SharingService, private actRoute: ActivatedRoute,  private cdr: ChangeDetectorRef,) { }

  ngOnInit() {
    this.getCarrito();
    // this.sharingService.setMusicEvent(this.actRoute.snapshot.params['id'])

    // this.getCurrentEvent();
  }

  getCarrito() {
    this.sharingService.getCarrito.subscribe((event) => {
      console.log(event)
      this.carrito = event;
      this.cdr.markForCheck();
    })
  }

  // getCurrentEvent() {
  //   this.sharingService.getCurrentEvent.subscribe((event) => {
  //     this.musicEvent = event
  //     // this.cdr.detectChanges(); // o this.cdr.markForCheck(); https://www.youtube.com/watch?v=JVuglXmslv4
  //     this.cdr.markForCheck(); // https://www.youtube.com/watch?v=JVuglXmslv4
  //   })
  // }
}
