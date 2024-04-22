import { Component } from '@angular/core';
import { PersonTableComponent } from './components/person-table/person-table.component';
import { Person } from './shared/interfaces/person';
import { EventBindExampleComponent } from './components/event-bind-example/event-bind-example.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ListGroupMenuComponent } from './components/list-group-menu/list-group-menu.component';
import { NavbarComponent } from './components/navbar/navbar.component';
/*to @Component einai o decorator ths "export class" leitourgei san annotation /*gia na ta syndeei, an parembalei kati anamesa den tha leitourgei!
*/
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ListGroupMenuComponent,
    RouterLink,
    RouterOutlet,
    NavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
