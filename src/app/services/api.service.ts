import { Injectable } from '@angular/core';
import { QuestionModel } from '../moldels/question';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RespostaModel } from '../moldels/resposta';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  // método para enviar dados ao servidor
  postQuestion(pergunta: QuestionModel): Observable<QuestionModel> {
    return this.http.post<QuestionModel>(`${environment.BASE_URL}/perguntas`, pergunta)
  }

  // método para obter dados do servidor
  getQuestion(): Observable<QuestionModel[]> {
    return this.http.get<QuestionModel[]>(`${environment.BASE_URL}/perguntas`)
  }

  // método para enviar dados ao servidor
  postAnswers(res: RespostaModel): Observable<RespostaModel> {
    return this.http.post<RespostaModel>(`${environment.BASE_URL}/respostas`, res)
  }

  // método para obter dados do servidor
  getAnswers(): Observable<RespostaModel[]> {
    return this.http.get<RespostaModel[]>(`${environment.BASE_URL}/respostas`)
  }

  // método para editar dado de resposta do servidor
  editAnswers(res: RespostaModel): Observable<RespostaModel> {
    return this.http.put<RespostaModel>(`${environment.BASE_URL}/respostas/${res.id}`, res)
  }

  // método para excluir resposta do servidor
  deleteAnswers(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.BASE_URL}/respostas/${id}`)
  }

  // método para editar dado de pergunta do servidor
  editarQuestion(res: QuestionModel): Observable<QuestionModel> {
    return this.http.put<QuestionModel>(`${environment.BASE_URL}/perguntas/${res.id}`, res)
  }

  // método para excluir pergunta do servidor
  deleteQuestion(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.BASE_URL}/perguntas/${id}`)
  }
}
