import { NgModule } from '@angular/core';

import { HelpmenuComponent } from './helpmenu/helpmenu';
import { ContactsDropdownComponent } from './contacts-dropdown/contacts-dropdown';
import { FaqDropdownComponent } from './faq-dropdown/faq-dropdown';

@NgModule({
    declarations: [
        HelpmenuComponent,
        ContactsDropdownComponent,
        FaqDropdownComponent ],
    imports: [],
    exports: [
        HelpmenuComponent,
        ContactsDropdownComponent,
        FaqDropdownComponent ]
})

export class ComponentsModule {}
