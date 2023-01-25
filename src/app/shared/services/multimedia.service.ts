import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MultimediaService {
  callback: EventEmitter<any> = new EventEmitter<any>();
  // myObservvable1$: Observable<any> = new Observable()

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public audio!: HTMLAudioElement; //todo: etiquetas que son reproductor

  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00')
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00')
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused')
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0)

  constructor() {
    this.audio = new Audio()

    this.trackInfo$.subscribe(responseOK => {
      if (responseOK) {
         //console.log('constructor ==> ', responseOK)
        this.setAudio(responseOK)
      }
    })

    this.listenAllEvents()
    // this.myObservvable1$ = new Observable((observer: Observer<any>) => {
    //   observer.next('enviar')
    // })
  }

  private listenAllEvents(): void {

    this.audio.addEventListener('timeupdate', this.calculateTime, false)
    this.audio.addEventListener('playing', this.setPlayerStatus, false)
    this.audio.addEventListener('play', this.setPlayerStatus, false)
    this.audio.addEventListener('pause', this.setPlayerStatus, false)
    this.audio.addEventListener('ended', this.setPlayerStatus, false)

  }

  //! estado de la cancion
  private setPlayerStatus = (state: any) => {
    switch (state.type) { //TODO: --> playing
      case 'play':
        this.playerStatus$.next('play')
        break
      case 'playing':
        this.playerStatus$.next('playing')
        break
      case 'ended':
        this.playerStatus$.next('ended')
        break
      default:
        this.playerStatus$.next('paused')
        break;
    }

  }


  private calculateTime = () => {
    const { duration, currentTime } = this.audio
    this.setTimeElapsed(currentTime)
    this.setRemaining(currentTime, duration)
    this.setPercentage(currentTime, duration)
  }

  //*porcentaje de la cancion para barra de progreso
  private setPercentage(currentTime: number, duration: number): void {
    //TODO duration ---> 100%
    //TODO currentTime ---> (x)
    //TODO (currentTime * 100) / duration
    let percentage = (currentTime * 100) / duration;
    this.playerPercentage$.next(percentage)
  }

  //!calcula la duracion de la cancion
  private setTimeElapsed(currentTime: number): void {
    let seconds = Math.floor(currentTime % 60) //TODO 1,2,3
    let minutes = Math.floor((currentTime / 60) % 60)
    //TODO  00:00 ---> 01:05 --> 10:15
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `-${displayMinutes}:${displaySeconds}`
    this.timeElapsed$.next(displayFormat)
  }

  //! calcula el tiempo restante de la cancion
  private setRemaining(currentTime: number, duration: number): void {
    let timeLeft = duration - currentTime;
    let seconds = Math.floor(timeLeft % 60)
    let minutes = Math.floor((timeLeft / 60) % 60)
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `-${displayMinutes}:${displaySeconds}`
    this.timeRemaining$.next(displayFormat)
  }

  //TODO: Funciones publicas

  //* coloca la cancion designada a media-player
  public setAudio(track: TrackModel): void {
    console.log('🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍', track);
    this.audio.src = 'http://'+track.url;
    this.audio.play();
  }

  //*colocar play o pause
  public togglePlayer(): void {
    (this.audio.paused) ? this.audio.play() : this.audio.pause()
  }

  //?adelantar-retroceder la cancion por el click en la barra de progreso
  
  public seekAudio(percentage: number): void {
    const { duration } = this.audio
    const percentageToSecond = (percentage * duration) / 100
    this.audio.currentTime = percentageToSecond

  }
}
