import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";


@Component({
  selector: 'primary-root',
  templateUrl: './primary.component.html',
  styleUrls: ['./primary.component.scss'],
  providers: [MessageService]
})


export class PrimaryComponent implements OnInit{

  constructor() { }

  ngOnInit(): void {
  }
}
