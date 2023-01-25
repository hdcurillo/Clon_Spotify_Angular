import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';
// import * as dataRaw from '../../../../data/tracks.json';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy {

  tracksTrending: Array<TrackModel> = [];
  tracksRandom: Array<TrackModel> = [];

  listObserver$: Array<Subscription> = [];

  constructor(private trackservice: TrackService) { }

  ngOnInit(): void {

    this.loadDataAll();
    this.loadDataRandom();

    // const { data }: any = (dataRaw as any).default;
    // this.mockTrackList = data;

    // const observer1$ = this.trackservice.dataTracksTrending$.subscribe (response => {
    //   this.tracksTrending = response;
    //   this.tracksRandom = response;
    //   //console.log('canciones trending => ', response)
    // })

    // const observer2$ = this.trackservice.dataTracksRandom$.subscribe (response => {
    //   this.tracksRandom = [... this.tracksRandom, ... response];
    //   //console.log('canciones random => ', response)
    // })
    // this.listObserver$ = [observer1$, observer2$];
  }

  async loadDataAll(): Promise<any> {
    // this.trackservice.getAllTracks().subscribe( (response: TrackModel[] ) => {
    //   // console.log('==> ', response)
    //   this.tracksTrending = response
    // });
    this.tracksTrending = await this.trackservice.getAllTracks().toPromise();
    //this.tracksRandom = await this.trackservice.getAllRandom().toPromise();
    //console.log('==> ', dataRaw)
  }

  loadDataRandom(): void {
    this.trackservice.getAllRandom().subscribe((response: TrackModel[]) => {
      //console.log('==> tracks ', response)
      this.tracksRandom = response
    });
  }

  ngOnDestroy(): void {
    // this.listObserver$.forEach(u => u.unsubscribe())
  }

}
