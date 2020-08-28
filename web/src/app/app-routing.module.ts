import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitialComponent } from './pages/initial/initial.component';
import { HasConversationGuard } from './guards/has-conversation.guard';

const routes: Routes = [
  {
    path: 'initial',
    component: InitialComponent
  },
  {
    path: 'conversation',
    loadChildren: () => import('./pages/conversation/conversation.module').then(m => m.ConversationModule),
    canActivate: [HasConversationGuard]
  },
  {
    path: '**',
    redirectTo: 'initial'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
