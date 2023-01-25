import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs'; //! programacion reactiva

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {

  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('')
  listObservers$: Array<Subscription> = [];
  state:string = "paused"

  constructor(public multimedia: MultimediaService) { }

  ngOnInit(): void {

    const observer1$ = this.multimedia.playerStatus$.subscribe(
      status => this.state = status
    );
    this.listObservers$ = [observer1$]

    // const observable1$ = this.multimedia.myObservvable1$.subscribe((responseOk) => {
    //   // todo: next()
    //   console.log('Flujo Perfecto')
    // }, (responseFail) => {
    //   // todo: error()
    //   console.log('Flujo Fallo')
    // } );

    // const observer1$: Subscription = this.multimedia.callback.subscribe(
    //   (response: TrackModel) => {

    //   }
    // )

    // this.listObservers$ = [observer1$]

  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe());
  }

  handlePosition(event: MouseEvent): void{
    // console.log('===> ', event)
    const elNative: HTMLElement = this.progressBar.nativeElement
    const { clientX } = event
    const { x, width } = elNative.getBoundingClientRect()
    const clickX = clientX - x //TODO: 1050 - x
    const percentageFromX = (clickX * 100) / width
    console.log(`Click(x): ${percentageFromX}`);
    this.multimedia.seekAudio(percentageFromX)
  }

}
