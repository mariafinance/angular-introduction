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

  person0 = {
    givenName: 'Maria',
    surName: 'Michail',
    age: 0x32,
    email: 'test@aueb.gr',
    address: 'Athens, Greece',
  };

  person1 = {
    givenName: 'John',
    surName: 'Doe',
    age: 0x33,
    email: 'john@aueb.gr',
    address: 'New York, USA',
  };
}
