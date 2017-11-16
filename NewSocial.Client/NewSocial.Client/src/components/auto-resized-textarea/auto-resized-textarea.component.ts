import { Component, NgZone, Input } from '@angular/core';

@Component({
  selector: 'auto-resized-textarea',
  templateUrl: './auto-resized-textarea.component.html',
  styleUrls: ['./auto-resized-textarea.component.css']
})
export class AutoResizedTextareaComponent {
  @Input() enterHandler : Function;
  
  placeholder : string = "Napisz komentarz...";
  rows : number = 1;

  constructor(private zone:NgZone) {}

  onKey(event: Event) { 
      this.handleHeight(event.srcElement as HTMLTextAreaElement);
    }
  
  onEnter(text : string) {
    this.enterHandler(text);
  }

  handleHeight(textarea: HTMLTextAreaElement) {
    if(textarea.clientHeight < textarea.scrollHeight) {
      this.rows++;
    }
  }
}