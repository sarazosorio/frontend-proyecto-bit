import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SolicitudesService, Solicitud1, Estado } from './solicitudes.service';

@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './solicitud.html',
  styleUrls: ['./solicitud.css']
})
export class Solicitud implements OnInit {

  solicitudes: Solicitud1[] = [];
  isEditing = false;
  selectedId: string | null = null;
  enviando = false; // ❌ Evita doble click

  form: Solicitud1 = {
    nombreCliente: '',
    email: '',
    empresa: '',
    servicio: '',
    mensaje: '',
    estado: 'nuevo'
  };

  constructor(private solicitudesService: SolicitudesService) {}

  ngOnInit(): void {
    this.loadSolicitudes();
  }

  // Cargar todas las solicitudes y ordenar por fecha descendente
  loadSolicitudes(): void {
    this.solicitudesService.getSolicitudes().subscribe({
      next: data => {
        if (data && Array.isArray(data)) {
          this.solicitudes = data.map(s => ({
            ...s,
            fecha: s.fecha || new Date().toISOString()
          })).sort((a, b) => {
            return new Date(b.fecha!).getTime() - new Date(a.fecha!).getTime();
          });
        } else {
          this.solicitudes = [];
        }
      },
      error: err => console.error('Error cargando solicitudes:', err)
    });
  }

  // Enviar o actualizar formulario
  submitForm(): void {
    if (this.enviando) return; // ❌ Bloquear doble click
    this.enviando = true;

    this.form.estado = this.form.estado as Estado;

    if (this.isEditing && this.selectedId) {
      // Actualizar solicitud
      this.solicitudesService.updateSolicitud(this.selectedId, this.form).subscribe({
        next: updated => {
          this.resetForm();
          // Reemplazar en la lista local para no recargar todo
          const index = this.solicitudes.findIndex(s => s._id === this.selectedId);
          if (index !== -1) this.solicitudes[index] = updated;
          this.enviando = false;
        },
        error: err => {
          console.error('Error actualizando solicitud:', err);
          this.enviando = false;
        }
      });
    } else {
      // Crear nueva solicitud
      this.form.estado = 'nuevo';
      this.solicitudesService.createSolicitud(this.form).subscribe({
        next: nueva => {
          this.solicitudes.unshift(nueva); // Agrega al inicio
          this.resetForm();
          this.enviando = false;
        },
        error: err => {
          console.error('Error creando solicitud:', err);
          this.enviando = false;
        }
      });
    }
  }

  // Editar solicitud
  editSolicitud(solicitud: Solicitud1): void {
    this.isEditing = true;
    this.selectedId = solicitud._id || null;

    this.form = {
      nombreCliente: solicitud.nombreCliente || '',
      email: solicitud.email || '',
      empresa: solicitud.empresa || '',
      servicio: solicitud.servicio || '',
      mensaje: solicitud.mensaje || '',
      estado: solicitud.estado || 'nuevo',
      fecha: solicitud.fecha
    };

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Eliminar solicitud
  deleteSolicitud(id: string | undefined): void {
    if (!id) return;
    if (!confirm('¿Estás seguro de eliminar esta solicitud?')) return;

    this.solicitudesService.deleteSolicitud(id).subscribe({
      next: () => {
        this.solicitudes = this.solicitudes.filter(s => s._id !== id);
      },
      error: err => console.error('Error eliminando solicitud:', err)
    });
  }

  cancelEdit(): void {
    this.resetForm();
  }

  // Resetear formulario
  resetForm(): void {
    this.form = {
      nombreCliente: '',
      email: '',
      empresa: '',
      servicio: '',
      mensaje: '',
      estado: 'nuevo'
    };
    this.isEditing = false;
    this.selectedId = null;
  }
}