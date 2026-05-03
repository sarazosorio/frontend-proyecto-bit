import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService  } from '@ngx-translate/core';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './servicios.html',
  styleUrls: ['./servicios.css']
})
export class Servicios {
   constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  changeLang(lang: string) {
    this.translate.use(lang);
  }
}