import { Component, OnInit } from '@angular/core';
import { QuestionModel } from 'src/app/moldels/question';
import { RespostaModel } from 'src/app/moldels/resposta';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

 pergunta!: string; 
 resposta1!: string;
 resposta2!: string;

 constructor(
  private apiService: ApiService
 ) {

 }

 ngOnInit() {
  // obter do servidor as respostas
  this.apiService.getAnswers().subscribe({
    next: (res: RespostaModel[]) =>  {
      this.resposta1 = res[0].resposta1,
      this.resposta2 = res[0].resposta2
    }
  })

  // obter do servidor a pergunta
  this.apiService.getQuestion().subscribe({
    next: (res: QuestionModel[]) => this.pergunta = res[0].pergunta
  })
 }

 
}
