import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faGithub,
  faLinkedin,
  faMeetup,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-footer',
  styleUrl: './footer.css',
  templateUrl: './footer.html',
})
export class Footer {
  protected readonly faGithub = faGithub;
  protected readonly faLinkedin = faLinkedin;
  protected readonly faMeetup = faMeetup;
  protected readonly faWhatsapp = faWhatsapp;
}
