import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Question } from '../questions.interface';
import { QuestionsService } from '../questions.service';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuestionsComponent implements OnInit {
  questions: Question[];
  searchTerm: string;

  paginationConfig = {
    itemsPerPage: 8,
    currentPage: 1,
    totalItems: 0
  };

  constructor(private questionsService: QuestionsService) { }

  ngOnInit(): void {
    this.initQuestionsAndCurrentPage();
  }

  initQuestionsAndCurrentPage(): void {
    this.paginationConfig.currentPage = this.questionsService.lastVisitedPage;
    this.questions = this.questionsService.questions;
  }

  onSearch(searchInputEl: HTMLInputElement): void{
    this.searchTerm = searchInputEl.value;
    this.getQuestions(this.searchTerm);
    searchInputEl.value = '';
  }

  getQuestions(searchTerm: string): void {
    this.questionsService.getQuestions(searchTerm)
      .subscribe(questions => {
        this.questions = questions;
        this.paginationConfig.totalItems = questions.length;
        this.paginationConfig.currentPage = 1;
      });
  }

  onPageChange(currentPage: number): void {
    this.paginationConfig.currentPage = currentPage;
    this.questionsService.lastVisitedPage = currentPage;
  }

 
}
