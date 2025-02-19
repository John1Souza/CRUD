import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DefaultLayoutComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
