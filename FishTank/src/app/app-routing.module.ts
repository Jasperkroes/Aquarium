import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FishComponent } from './fish/fish.component';
import { FishinfoComponent } from './fishinfo/fishinfo.component';

const routes: Routes = [
  { path: '', component: FishComponent },
  { path: 'fishinfo/:id', component: FishinfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
