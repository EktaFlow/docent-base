import { NgModule } from '@angular/core';

import { HelpmenuComponent } from './helpmenu/helpmenu';
import { ContactsDropdownComponent } from './contacts-dropdown/contacts-dropdown';

@NgModule({
    declarations: [
        HelpmenuComponent,
        ContactsDropdownComponent ],
    imports: [],
    exports: [
        HelpmenuComponent,
        ContactsDropdownComponent ]
})

export class ComponentsModule {}
