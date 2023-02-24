import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarritoComponent {
  selectedTicket$: Observable<number>

  constructor(sharingService: SharingService) {
    this.selectedTicket$ = sharingService.getSelectedTicket;
  }
}
