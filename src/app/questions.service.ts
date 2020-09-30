import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Question, Questions } from './questions.interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  apiUrl = 'https://api.stackexchange.com/2.2/search?order=desc&sort=activity&site=stackoverflow&pagesize=100&';
  questions: Question[];

  constructor(private http: HttpClient) {}

  getQuestions(searchTerm: string): Observable<Question[]>{
    const searchParam = `intitle=${searchTerm}`;
    return this.http.get<Questions>(this.apiUrl + searchParam).pipe(
      map(data => data.items)
    );
  }

  setQuestions(questions: Question[]): void{
    this.questions = questions;
  }

  getQuestion(id: number): Question {
    return this.questions.find(q => q.question_id === id);
  }
}

