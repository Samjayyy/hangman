import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hm-storefeedback',
  templateUrl: './storefeedback.component.html',
  styleUrls: ['./storefeedback.component.css']
})
export class StoreFeedbackComponent implements OnInit {

  @Input()
  public error?: any;

  @Input()
  public isFetching: string;


  ngOnInit(): void {
  }

}
