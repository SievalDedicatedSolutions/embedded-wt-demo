import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { WtPageComponent } from './pages/wt-page/wt-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'wt', component: WtPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
