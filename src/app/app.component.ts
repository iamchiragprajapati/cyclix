import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DxAutocompleteModule } from 'devextreme-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , DxAutocompleteModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'cyclix';

  constructor() {}

  ngOnInit() {}
}
