import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
// import { TrackModel } from "@core/models/tracks.model";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TrackModel } from '@core/models/tracks.model';
// import * as dataRaw from '../../../data/tracks.json'

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.api;

  // dataTracksTrending$ : Observable<TrackModel[]> = of([]);
  // dataTracksRandom$ : Observable<TrackModel[]> = of([]);

  constructor(private http: HttpClient) {
    // const { data }: any = (dataRaw as any).default;
    // this.dataTracksTrending$ = of(data);

    // this.dataTracksRandom$ = new Observable( (observer) => {
    //   const trackExample: TrackModel = {
    //     _id: 9,
    //     name: 'Borck Ansiolitiko',
    //     album: 'Paris',
    //     url: 'https://',
    //     cover: 'https://cdns-images.dzcdn.net/images/cover/c1292916489abe6d663bbf03d6dc960a/350x350.jpg',
    //   };

    //   setTimeout(() => {  
    //     observer.next([trackExample]);
    //   }, 3500);
    // });
  }

  private skipById(listTracks: TrackModel[], id:number): Promise<TrackModel[]> {
    return new Promise((resolve, reject) => {
      const listTmp = listTracks.filter(a => a._id !== id);
      resolve(listTmp);
    });
  };

  //  todo: devuelve todas las canciones de la api
  getAllTracks(): Observable<any> {
    return this.http.get(`${this.URL}/tracks`).pipe(
      map(({ data }: any) => {
        console.log('revisar data ==> ', data )
        return data
      })
    )
  }

  //  todo: devolver canciones random
  getAllRandom(): Observable<any> {
    return this.http.get(`${this.URL}/tracks`).pipe(
      mergeMap(({ data }: any) => this.skipById(data, 2)),
      // tap(data => console.log(data)),
      catchError( (err) => {
        const { status, statusText } = err;
        //console.log('Algo sucedio ==> ', [status, statusText]);
        return of([]);
      })

      // map(({ data }: any) => { //!devolvemos lista invertida
      //   return data.reverse();
      // }),
      //  map((dataInvertida) => { //! aplicamos filtros comunes de array
      //   return dataInvertida.filter((track: TrackModel) => track._id !== 1);
      //   })

    )
  }
}
