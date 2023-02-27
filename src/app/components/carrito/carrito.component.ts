import { Pedido } from '../../interfaces/pedido';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { SharingService } from '../../services/sharing.service';
import { MusicEvent } from '../../interfaces/music-event';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarritoComponent {

  musicEvent: MusicEvent = {};
  carrito: Pedido[] = [];

  constructor(public sharingService: SharingService, private actRoute: ActivatedRoute,  private cdr: ChangeDetectorRef,) { }

  ngOnInit() {
    this.getCarrito();
  }

  getCarrito() {
    this.sharingService.getCarrito.subscribe((carrito) => {
      this.carrito = carrito;
      this.cdr.markForCheck();
    })
  }
}
