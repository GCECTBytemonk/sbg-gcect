import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { PaperBackground } from './components/paper-background/paper-background';
import { Footer } from './components/footer/footer';

@Component({
  imports: [RouterOutlet, Navbar, PaperBackground, Footer],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('frontend');
}
