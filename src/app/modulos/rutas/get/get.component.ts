import { Component, OnInit } from '@angular/core';
import { RutasService } from 'src/app/servicios/rutas.service';
import { RutaModelo } from 'src/app/modelos/ruta.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(private rutasService: RutasService) { }

  listado: RutaModelo[] = []

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.rutasService.getAll().subscribe((data: RutaModelo[]) => {
      this.listado = data
      console.log(data)
    })
  }

  delete(id?: any){
    console.log(id)
    Swal.fire({
      title: '¿Esta seguro de eliminar esta Ruta?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.rutasService.delete(id).subscribe((data: any) => {
          Swal.fire('¡Ruta Eliminada!', '', 'success')
          this.getAll();
        })
      }
    })
  }

}
