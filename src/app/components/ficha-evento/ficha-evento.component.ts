import { ActivatedRoute } from '@angular/router';
import { SharingService } from 'src/app/services/sharing.service';
import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-ficha-evento',
  templateUrl: './ficha-evento.component.html',
  styleUrls: ['./ficha-evento.component.css']
})
export class FichaEventoComponent {
  constructor(
    private sharingService: SharingService,
    private cdr: ChangeDetectorRef,
    private actRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.sharingService.setMusicEvent(this.actRoute.snapshot.params['id'])
  }


}
