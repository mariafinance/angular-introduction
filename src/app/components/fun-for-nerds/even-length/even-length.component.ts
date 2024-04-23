import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-even-length',
  standalone: true,
  imports: [],
  templateUrl: './even-length.component.html',
  styleUrl: './even-length.component.css'
})
export class EvenLengthComponent {
 @Input() words: string[] =[];
 @Input() partialWord: string= '';
}
