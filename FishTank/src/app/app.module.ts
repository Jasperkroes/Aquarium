import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClickOutsideModule } from 'ng-click-outside';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FishComponent } from './fish/fish.component';
import { FishinfoComponent } from './fishinfo/fishinfo.component';
import { HttpClientModule } from '@angular/common/http';
import { AnimatedFishComponent } from './animated-fish/animated-fish.component';
import { IdeaComponent } from './idea/idea.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FishComponent,
    FishinfoComponent,
    AnimatedFishComponent,
    IdeaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ClickOutsideModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
