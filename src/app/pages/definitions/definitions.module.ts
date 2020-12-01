import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../components/components.module';

import { DefinitionsPage } from './definitions.page';

const routes: Routes = [
  {
    path: '',
    component: DefinitionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DefinitionsPage],
  exports: [DefinitionsPage]
})
export class DefinitionsPageModule {}
