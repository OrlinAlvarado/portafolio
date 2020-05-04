import { Producto } from './../../interfaces/producto.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from 'src/app/interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  producto: ProductoDescripcion;
  id: string;
  constructor( private route: ActivatedRoute,
               public productoService: ProductosService) {
   }

  ngOnInit(): void {
    this.route.params
        .subscribe(params => {
          this.id = params['id'];
          this.productoService.getProducto(this.id)
              .subscribe( (producto: ProductoDescripcion) => {
                this.producto = producto;
              });
        });
  }

}
