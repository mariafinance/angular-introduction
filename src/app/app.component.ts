import { Component } from '@angular/core';
/*to @Component einai o decorator ths "export class" leitourgei san annotation /*gia na ta syndeei, an parembalei kati anamesa den tha leitourgei!
*/
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  name = 'Maria';

  person = {
    givenName: 'Maria',
    surName: 'Michail',
    age: 0x32,
    email: 'test@aueb.gr',
  };
}
