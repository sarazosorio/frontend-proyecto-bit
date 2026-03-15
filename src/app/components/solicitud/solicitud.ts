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
  enviando = false; // bloquea botón mientras se envía

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

  // Cargar todas las solicitudes desde el servidor
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
      error: err => {
        console.error('Error cargando solicitudes:', err);
        alert('No se pudieron cargar las solicitudes desde el servidor.');
      }
    });
  }

  // Enviar o actualizar formulario
  submitForm(): void {
    if (this.enviando) return;
    this.enviando = true;
    this.form.estado = this.form.estado as Estado;

    if (this.isEditing && this.selectedId) {
      console.log('Actualizando solicitud con ID:', this.selectedId);
      this.solicitudesService.updateSolicitud(this.selectedId, this.form).subscribe({
        next: updated => {
          const index = this.solicitudes.findIndex(s => s._id === this.selectedId);
          if (index !== -1) this.solicitudes[index] = updated;
          this.resetForm();
          this.enviando = false;
          alert('Solicitud actualizada correctamente.');
        },
        error: err => {
          console.error('Error actualizando solicitud:', err);
          alert('No se pudo actualizar. La solicitud podría no existir. Se recargará la lista.');
          this.loadSolicitudes();
          this.resetForm();
          this.enviando = false;
        }
      });
    } else {
      this.form.estado = 'nuevo';
      this.solicitudesService.createSolicitud(this.form).subscribe({
        next: nueva => {
          this.solicitudes.unshift(nueva);
          this.resetForm();
          this.enviando = false;
          alert('Solicitud creada correctamente.');
        },
        error: err => {
          console.error('Error creando solicitud:', err);
          alert('No se pudo crear la solicitud.');
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
    if (!id) {
      console.error('No se puede eliminar: ID vacío');
      return;
    }
    if (!confirm('¿Estás seguro de eliminar esta solicitud?')) return;

    console.log('Eliminando ID:', id);
    this.solicitudesService.deleteSolicitud(id).subscribe({
      next: () => {
        alert('Solicitud eliminada correctamente.');
        this.loadSolicitudes();
      },
      error: err => {
        console.error('Error eliminando solicitud:', err);
        alert('No se pudo eliminar la solicitud. Es posible que ya no exista.');
      }
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