import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { RibbonModule } from './ribbon/ribbon.module';
import Iconify from '@iconify/iconify';
import { SheetModule } from './sheet/sheet.module';

Iconify.ready(()=>{
  console.log('ok');
});

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RibbonModule,
    SheetModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
