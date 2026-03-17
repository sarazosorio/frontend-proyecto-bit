import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SolicitudesService, Solicitud1 } from './solicitudes.service';

@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, DatePipe],
  templateUrl: './solicitud.html',
  styleUrls: ['./solicitud.css']
})
export class Solicitud implements OnInit {

  solicitudes: Solicitud1[] = [];
  form: Solicitud1 = { nombreCliente:'', email:'', empresa:'', servicio:'', mensaje:'', estado:'nuevo' };
  isEditing = false;
  selectedId: string | null = null;
  enviando = false;

  constructor(private solicitudesService: SolicitudesService) {}

  ngOnInit(): void {
    this.loadSolicitudes();
  }

  // Cargar todas las solicitudes desde backend
  loadSolicitudes(): void {
    this.solicitudesService.getSolicitudes().subscribe(data => {
      this.solicitudes = (data || [])
        .map(s => ({ ...s, fecha: s.fecha || new Date().toISOString() }))
        .sort((a, b) => new Date(b.fecha!).getTime() - new Date(a.fecha!).getTime());
    });
  }

  submitForm(): void {
    if (this.enviando) return;
    this.enviando = true;
    const payload = { ...this.form };

    if (this.isEditing && this.selectedId) {
      // Actualizar
      this.solicitudesService.updateSolicitud(this.selectedId, payload).subscribe({
        next: updated => {
          alert('Solicitud actualizada correctamente.');
          // Actualizamos solo la card editada en el array
          this.solicitudes = this.solicitudes.map(s => s._id === updated._id ? updated : s);
          this.resetForm();
          this.enviando = false;
        },
        error: () => this.enviando = false
      });
    } else {
      // Crear
      this.solicitudesService.createSolicitud(payload).subscribe({
        next: nueva => {
          alert('Solicitud creada correctamente.');
          // Agregamos nueva card al inicio de la lista
          this.solicitudes = [nueva, ...this.solicitudes];
          this.resetForm();
          this.enviando = false;
        },
        error: () => this.enviando = false
      });
    }
  }

  editSolicitud(s: Solicitud1): void {
    this.isEditing = true;
    this.selectedId = s._id || null;
    this.form = { ...s };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteSolicitud(id?: string): void {
    if (!id || !confirm('¿Estás seguro de eliminar esta solicitud?')) return;

    this.solicitudesService.deleteSolicitud(id).subscribe({
      next: () => {
        alert('Solicitud eliminada correctamente.');
        // Eliminamos card del array
        this.solicitudes = this.solicitudes.filter(s => s._id !== id);
      }
    });
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.form = { nombreCliente:'', email:'', empresa:'', servicio:'', mensaje:'', estado:'nuevo' };
    this.isEditing = false;
    this.selectedId = null;
  }

  trackById(index: number, item: Solicitud1): string | undefined {
    return item._id;
  }
}