import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  lang: 'es' | 'en' = 'es';
  open = false;

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  toggleOpen() {
    this.open = !this.open;
  }

  changeLang(lang: 'es' | 'en') {
    this.lang = lang;
    this.translate.use(lang);
    this.open = false;
  }
}