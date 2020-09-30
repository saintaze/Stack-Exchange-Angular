import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Stack Exchange Angular';
  searchTerm: string;

  onSearch(searchInputEl: HTMLInputElement){
    this.searchTerm = searchInputEl.value;
    searchInputEl.value = '';
    console.log(this.searchTerm);
  }
}
