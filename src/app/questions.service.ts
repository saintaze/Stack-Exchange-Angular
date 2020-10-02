import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Question, Questions } from './questions.interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  apiUrl = 'https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=activity&site=stackoverflow&pagesize=100&';
  questions: Question[] = [];
  lastVisitedPage = 1;

  constructor(private http: HttpClient) {}

  getQuestions(searchTerm: string): Observable<Question[]>{
    const searchParam = `q=${searchTerm}`;
    return this.http.get<Questions>(this.apiUrl + searchParam).pipe(
      map(data => {
        this.questions = data.items;
        return data.items;
      })
    );
  }

  getQuestion(id: number): Question {
    return this.questions.find(q => q.question_id === id);
  }

}



