import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FishComponent } from './fish/fish.component';
import { FishinfoComponent } from './fishinfo/fishinfo.component';
import { IdeaComponent } from './idea/idea.component';

const routes: Routes = [
  { path: '', component: FishComponent },
  { path: 'fishinfo/:id', component: FishinfoComponent },
  { path: 'newIdea', component: IdeaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
