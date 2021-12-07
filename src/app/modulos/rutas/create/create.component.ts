import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RutasService } from 'src/app/servicios/rutas.service';
import { RutaModelo } from 'src/app/modelos/ruta.model';
import Swal from 'sweetalert2';
import { ServicioModelo } from 'src/app/modelos/servicio.model';
import { ServiciosService } from 'src/app/servicios/servicios.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private rutasService: RutasService,
    private serviciosService: ServiciosService,
    private router: Router) { }

    listadoServicios: ServicioModelo[] = []

  fgValidacion = this.fb.group({
    tiempo_estimado: ['', [Validators.required]],
    origen: ['', [Validators.required]],
    destino: ['', [Validators.required]],
    id: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.getAllServicios()
  }

  store(){
    let ruta = new RutaModelo();
    ruta.tiempo_estimado = this.fgValidacion.controls["tiempo_estimado"].value;
    ruta.origen = this.fgValidacion.controls["origen"].value;
    ruta.destino = this.fgValidacion.controls["destino"].value;
     
    this.rutasService.store(ruta).subscribe((data: RutaModelo)=> {
      Swal.fire('Nueva Ruta Creada!', '', 'success')
      this.router.navigate(['/rutas/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

  getAllServicios(){
    this.serviciosService.getAll().subscribe((data: ServicioModelo[]) => {
      this.listadoServicios = data
      console.log(data)
    })
  }


}
