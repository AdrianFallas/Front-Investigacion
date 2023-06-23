import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonComponent } from './Components/person/person.component';
import { PersonListComponent } from './Components/person-list/person-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'person', pathMatch: 'full' }
  , { path: "person", component: PersonComponent, pathMatch: "full" }
  , { path: "person-list", component: PersonListComponent, pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
