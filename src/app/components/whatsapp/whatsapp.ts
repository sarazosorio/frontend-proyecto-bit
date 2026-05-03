import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-whatsapp',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './whatsapp.html',
  styleUrls: ['./whatsapp.css']
})
export class WhatsApp {

   constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  changeLang(lang: string) {
    this.translate.use(lang);
  }
}