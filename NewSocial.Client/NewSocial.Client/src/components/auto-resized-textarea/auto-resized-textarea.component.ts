import { Component } from '@angular/core';

@Component({
  selector: 'auto-resized-textarea',
  templateUrl: './auto-resized-textarea.component.html',
  styleUrls: ['./auto-resized-textarea.component.css']
})
export class AutoResizedTextareaComponent {
    text : string = "";
    rows : number = 1;
    constructor() {

    }
}