import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { EventsViewComponent } from './events-view/events-view.component';
import { FileManagerComponent } from './file-manager/file-manager.component';


const routes: Routes = [
  { path: '',  component: EventsViewComponent },
  { path: 'events',  component: EventsViewComponent },
  { path: 'files', component:FileManagerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
