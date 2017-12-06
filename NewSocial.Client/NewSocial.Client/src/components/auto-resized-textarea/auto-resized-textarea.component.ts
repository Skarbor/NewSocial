import { Component, EventEmitter, NgZone, Input, Output } from '@angular/core';

@Component({
  selector: 'auto-resized-textarea',
  templateUrl: './auto-resized-textarea.component.html',
  styleUrls: ['./auto-resized-textarea.component.css']
})
export class AutoResizedTextareaComponent {
  @Input() parentId : number;
  @Output() enterHandler = new EventEmitter();

  placeholder : string = "Napisz komentarz...";
  rows : number = 1;
  text : string = "";

  constructor(private zone: NgZone) {}

  onKey(event: Event) { 
      this.handleHeight(event.srcElement as HTMLTextAreaElement);
    }
  
  onEnter(text : string) {
    let eventParams = {text : text, parentId : this.parentId};
    this.enterHandler.emit(eventParams);

    this.clearTextArea();
  }

  clearTextArea() {
    this.text = "";
    this.rows = 1;
  }

  handleHeight(textarea: HTMLTextAreaElement) {
    if(textarea.clientHeight < textarea.scrollHeight) {
      this.rows++;
    }
  }
}