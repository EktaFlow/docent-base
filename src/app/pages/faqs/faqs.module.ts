import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ContactsDropdownComponent } from '../../app/contacts-dropdown/contacts-dropdown.component';
import { FaqDropdownComponent } from '../../app/faq-dropdown/faq-dropdown.component';

import { IonicModule } from '@ionic/angular';

import { FaqsPage } from './faqs.page';

const routes: Routes = [
  {
    path: '',
    component: FaqsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactsDropdownComponent,
    FaqDropdownComponent,
    RouterModule.forChild(routes)
  ],
  declarations: [FaqsPage]
})
export class FaqsPageModule {}
