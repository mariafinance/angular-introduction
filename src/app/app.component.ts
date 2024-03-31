import { Component } from '@angular/core';
import { PersonTableComponent } from './components/person-table/person-table.component';
/*to @Component einai o decorator ths "export class" leitourgei san annotation /*gia na ta syndeei, an parembalei kati anamesa den tha leitourgei!
*/
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PersonTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  name = 'Maria';

  
}
