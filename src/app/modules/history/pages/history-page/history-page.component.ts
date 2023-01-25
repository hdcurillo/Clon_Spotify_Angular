import { Component, OnInit } from '@angular/core';
import { SearchService } from '@modules/history/services/search.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {

  listResults$: Observable<any> = of([]);

  constructor(private search: SearchService) { }

  ngOnInit(): void {
  }

  receiveData(event: string): void {
    // todo: se ejecuta cuando posee 3 caracteres
    console.log('componente padre ==> ', event);
    
    this.listResults$ = this.search.searchTracks$(event)
  }
}
