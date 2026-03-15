import { Component, signal } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { Navbar } from './components/navbar/navbar';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';

import { Hero } from './components/hero/hero';
import { Servicios } from './components/servicios/servicios';
import { Experiencia } from './components/experiencia/experiencia';
import { PorQueElegirnos } from './components/por-que-elegirnos/por-que-elegirnos';
import { Pasos } from './components/pasos/pasos';
import { Solicitud } from './components/solicitud/solicitud';
import { WhatsApp } from './components/whatsapp/whatsapp';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet ,
    RouterModule,
    Navbar,
    Hero,
    Servicios,
    Experiencia,
    PorQueElegirnos,
    Pasos,
    // Solicitud,
    WhatsApp,
    Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('cickprime');
}
