const event68Url = "../../assets/data/event-info-68.json";

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MusicEvent } from '../interfaces/music-event';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getMusicEvent(): Observable<HttpResponse<MusicEvent>> {
    return this.http.get<MusicEvent>(
      event68Url, { observe: 'response' });
  }
}
