import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-por-que-elegirnos',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './por-que-elegirnos.html',
  styleUrls: ['./por-que-elegirnos.css']
})
export class PorQueElegirnos {

  constructor(private translate: TranslateService) {
      this.translate.setDefaultLang('es');
      this.translate.use('es');
    }
  
    changeLang(lang: string) {
      this.translate.use(lang);
    }
}