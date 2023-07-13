import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuestionComponent } from './components/question/question.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { SelectComponent } from './components/select/select.component';
import { CaixaComponent } from './components/caixa/caixa.component';
import { LinkComponent } from './components/link/link.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "question", component: QuestionComponent},
  {path: "checkbox", component: CheckboxComponent},
  {path: "select", component: SelectComponent},
  {path: "caixa", component: CaixaComponent},
  {path: "link", component: LinkComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
