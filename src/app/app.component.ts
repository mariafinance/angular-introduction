import { Component } from '@angular/core';
import { PersonTableComponent } from './components/person-table/person-table.component';
import { Person } from './shared/interfaces/person';
import { EventBindExampleComponent } from './components/event-bind-example/event-bind-example.component';
import { RouterLink, RouterOutlet } from '@angular/router';
/*to @Component einai o decorator ths "export class" leitourgei san annotation /*gia na ta syndeei, an parembalei kati anamesa den tha leitourgei!
*/
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PersonTableComponent, EventBindExampleComponent,
  RouterLink,
  RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
