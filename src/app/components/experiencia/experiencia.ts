import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-experiencia',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './experiencia.html',
  styleUrls: ['./experiencia.css']
})
export class Experiencia {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  changeLang(lang: string) {
    this.translate.use(lang);
  }
}