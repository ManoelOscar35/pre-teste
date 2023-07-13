import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionModel } from 'src/app/moldels/question';
import { RespostaModel } from 'src/app/moldels/resposta';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  perguntaEditar: boolean = false;
  respostaEditar: boolean = false;
  respostas: RespostaModel[] = [];
  pergunta: QuestionModel[] = [];

  formQuestion!: FormGroup;
  formAnswers!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {

  }

  // formulário de perguntas
  initFormQuestion() {
    this.formQuestion = this.fb.group({
      id: [null],
      pergunta: [null, Validators.required]
    });
  }

  // formulário de respostas
  initFormAnswers() {
    this.formAnswers = this.fb.group({
      id: [null],
      resposta1: [null, Validators.required],
      resposta2: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.initFormQuestion();
    this.initFormAnswers();
    this.getRespostas();
    this.getPergunta();
  }

  // método de submit do formulário de perguntas com possibilidade de editar pergunta
  submitQuestion() {
    if(this.perguntaEditar) {
      let data = this.formQuestion.value;
      this.apiService.editarQuestion(data).subscribe({
        next: (res: QuestionModel) => this.ngOnInit()
      })
    } else {
      this.apiService.postQuestion(this.formQuestion.value).subscribe()
    }
    
  }

  // método de submit do formulário de respostas com possibilidade de editar respostas
  submitAnswer() {
    if(this.respostaEditar) {
      let data = this.formAnswers.value;
      this.apiService.editAnswers(data).subscribe({
        next: (res: RespostaModel) => this.ngOnInit()
      })
    } else {
      this.apiService.postAnswers(this.formAnswers.value).subscribe({
        next: (res: RespostaModel) => this.ngOnInit()
      })
    }
  }

  // método para obter do servidor as respostas
  getRespostas() {
    this.apiService.getAnswers().subscribe({
      next: (res: RespostaModel[]) => this.respostas = res
    })
  }

  // método para obter do servidor a pergunta
  getPergunta() {
    this.apiService.getQuestion().subscribe({
      next: (res: QuestionModel[]) => this.pergunta = res
    });
  }

  // método para editar resposta
  edit(res: RespostaModel) {
    this.respostaEditar = true;
    this.formAnswers.patchValue({
      id: res.id,
      resposta1: res.resposta1,
      resposta2: res.resposta2
    })
    
  }

  // método para deletar respostas
  delete(id: any) {
    this.apiService.deleteAnswers(id).subscribe({
      next: (res: any) => this.ngOnInit()
    })
  }

  // método para editar pergunta
  editarPergunta(pergunta: QuestionModel) {
    this.perguntaEditar = true;
    this.formQuestion.patchValue({
      id: pergunta.id,
      pergunta: pergunta.pergunta
    })
  }

  // método para deletar pergunta
  deletarPergunta(id: any) {
    this.apiService.deleteQuestion(id).subscribe({
      next: (res: any) => this.ngOnInit()
    })
  }
}
