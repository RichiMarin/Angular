import { Component, OnInit } from '@angular/core';
import { ServicioModelo } from 'src/app/modelos/servicio.model';
import { ServiciosService } from 'src/app/servicios/servicios.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(private serviciosService: ServiciosService) { }

  listado: ServicioModelo[] = []

    ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.serviciosService.getAll().subscribe((data: ServicioModelo[]) => {
      this.listado = data
      console.log(data)
    })
  }

  delete(id?: any){
    console.log(id)
    Swal.fire({
      title: '¿Esta seguro de eliminar este Servicio?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviciosService.delete(id).subscribe((data: any) => {
          Swal.fire('¡Servicio Eliminado!', '', 'success')
          this.getAll();
        })
      }
    })
  }

}
