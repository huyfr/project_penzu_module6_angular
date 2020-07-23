import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {DiaryShowComponent} from './diary/diary-show/diary-show.component';


const routes: Routes = [
  { path: 'diaries', component: DiaryShowComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules, useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
