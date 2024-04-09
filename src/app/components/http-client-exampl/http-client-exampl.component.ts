import { Component, OnInit, inject } from '@angular/core';
import { chuckNorrisJoke, dadJoke } from 'src/app/shared/interfaces/jokes';
import { JokesService } from 'src/app/shared/services/jokes.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-http-client-exampl',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './http-client-exampl.component.html',
  styleUrl: './http-client-exampl.component.css'
})
export class HttpClientExamplComponent implements OnInit {
  jokesService = inject(JokesService)
  dadJoke = ''
  chuckNorrisJoke = ''

  ngOnInit(): void {
    // this.jokesService.getDadJoke().subscribe((data: dadJoke)=>{
    //   console.log(data.joke);
    //   this.dadJoke = data.joke;
    // });
    this.refreshDadJoke();
    // this.jokesService.getChuckNorrisJoke().subscribe((data: chuckNorrisJoke)=>{
    //   console.log(data.value);
    //   this.chuckNorrisJoke = data.value;
    // });
    this.refreshChuckNorrisJoke();
  }

  refreshDadJoke() {
    this.jokesService.getDadJoke().subscribe((data: dadJoke)=>{
      console.log(data.joke);
      this.dadJoke = data.joke;
    });
  }

  refreshChuckNorrisJoke() {
    this.jokesService.getChuckNorrisJoke().subscribe((data: chuckNorrisJoke)=>{
      console.log(data.value);
      this.chuckNorrisJoke = data.value;
    });
  }
}
