import { Component, OnInit } from '@angular/core';
import { Question } from '../questions.interface';
import { QuestionsService } from '../questions.service';
import { mockQuestions} from '../data';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  questions: Question[];
  searchTerm: string;
  
  mockQuestions = mockQuestions.items;

  paginationConfig = {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: this.mockQuestions.length
  };

  constructor(private questionsService: QuestionsService) { }

  ngOnInit(): void {
  }

  onSearch(searchInputEl: HTMLInputElement) {
    this.searchTerm = searchInputEl.value;
    this.getQuestions(this.searchTerm);
    searchInputEl.value = '';
    console.log(this.searchTerm);
  }

  getQuestions(searchTerm: string){
    this.questionsService.getQuestions(searchTerm)
      .subscribe(questions => {
        this.questions = questions;
        console.log(questions)
      });
  }

  onPageChange(currentPage: number){
    this.paginationConfig.currentPage = currentPage;
  }

}
