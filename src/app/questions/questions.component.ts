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
  
  isLoading = false;
  initialLoad = true;
  paginationConfig = {
    itemsPerPage: 8,
    currentPage: 1,
    totalItems: 0
  };

  constructor(private questionsService: QuestionsService) { }

  ngOnInit(): void {
    this.initQuestionsAndMetaData();
  }

  initQuestionsAndMetaData() {
    this.questions = this.questionsService.questions;
    this.paginationConfig.totalItems = this.questions.length;
    this.paginationConfig.currentPage = this.questionsService.lastVisitedPage;
  }

  onSearch(searchInputEl: HTMLInputElement): void{
    this.searchTerm = searchInputEl.value;
    this.getQuestions(this.searchTerm);
    searchInputEl.value = '';
  }

  getQuestions(searchTerm: string): void {
    if(!searchTerm.trim().length) return;
    this.isLoading = true;
    this.questionsService.getQuestions(searchTerm)
      .subscribe(_ => {
        this.initQuestionsAndMetaData();
        this.isLoading = false;
        this.initialLoad = false;
      });
  }

  onPageChange(currentPage: number): void {
    this.paginationConfig.currentPage = currentPage;
    this.questionsService.lastVisitedPage = currentPage;
  }

}


