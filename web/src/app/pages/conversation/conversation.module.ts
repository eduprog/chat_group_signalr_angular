import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConversationRoutingModule } from './conversation-routing.module';
import { ConversationComponent } from './conversation.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/modules/material.module';


@NgModule({
  declarations: [ConversationComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ConversationRoutingModule,
    FormsModule
  ]
})
export class ConversationModule { }
