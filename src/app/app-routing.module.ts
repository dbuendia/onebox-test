import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { FichaEventoComponent } from './components/ficha-evento/ficha-evento.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'ficha-evento/:id', component: FichaEventoComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
