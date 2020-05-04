import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos(){
    return new Promise( (resolve, reject) => {
      this.http.get('https://angular-html-dbd46.firebaseio.com/productos_idx.json')
          .subscribe( (resp: Producto[]) => {
            this.productos = resp;
            this.cargando = false;
            resolve();
          });

    });

  }

  getProducto(id: string){
    return this.http.get(`https://angular-html-dbd46.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto( termino: string){
    console.log(termino);

    console.log(this.productos);

    if (this.productos.length === 0){
      this.cargarProductos().then( () => {
        // Este  codigo se va ejecutar despues de cargar productos
        // Aplicar Filtro
        this.filtrarProducto(termino);
      });
    } else {
      this.filtrarProducto(termino);
    }

  }

  private filtrarProducto( termino: string){
    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();
    this.productos.forEach(prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0 ){
        this.productosFiltrado.push(prod);
      }
    });
  }
}
