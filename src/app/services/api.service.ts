const eventsUrl = "../../assets/events.json";
const event68Url = "../../assets/event-info-68.json";
const event184Url = "../../assets/event-info-184.json";

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
