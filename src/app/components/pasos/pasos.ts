import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-pasos',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './pasos.html',
  styleUrls: ['./pasos.css']
})
export class Pasos {
   constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  changeLang(lang: string) {
    this.translate.use(lang);
  }
}