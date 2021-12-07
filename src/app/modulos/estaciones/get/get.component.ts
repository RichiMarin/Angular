import { Component, OnInit } from '@angular/core';
import { EstacionesService } from 'src/app/servicios/estaciones.service';
import { EstacionModelo } from 'src/app/modelos/estacion.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(private estacionService: EstacionesService) { }

  listado: EstacionModelo[] = []
  
  ngOnInit(): void {
    this.getAll()
  }
  
  getAll(){
    this.estacionService.getAll().subscribe((data: EstacionModelo[]) => {
      this.listado = data
      console.log(data)
    })
  }
 
  delete(id?: any){
    console.log(id)
    Swal.fire({
      title: '¿Esta seguro de eliminar el registro de esta Estacion?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.estacionService.delete(id).subscribe((data: any) => {
          Swal.fire('¡Estacion Eliminada!', '', 'success')
          this.getAll();
        })
      }
    })
  }


}
