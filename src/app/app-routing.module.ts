import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { QuestionsComponent } from './questions/questions.component';

const routes: Routes = [
  {path: '', redirectTo: '/questions', pathMatch: 'full'},
  {path: 'questions', component: QuestionsComponent},
  {path: 'questions/:id', component: QuestionDetailComponent},
  {path: '**', redirectTo: '/questions'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
