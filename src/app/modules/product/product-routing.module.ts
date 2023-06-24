import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductlistComponent } from './productlist/productlist.component';

const routes: Routes = [
  { path: '', component: ProductAddComponent},
  { path: 'product-list', component: ProductlistComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
