import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Question } from '../questions.interface';
import { QuestionsService } from '../questions.service';
import { mockQuestions} from '../data';
import { Router } from '@angular/router';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuestionsComponent implements OnInit {
  questions: Question[];
  searchTerm: string;
  
  mockQuestions = mockQuestions.items;

  paginationConfig = {
    itemsPerPage: 8,
    currentPage: 1,
    totalItems: this.mockQuestions.length
  };

  constructor(private questionsService: QuestionsService, private router: Router) { }

  ngOnInit(): void {
    this.setCurrentPage();
  }

  onSearch(searchInputEl: HTMLInputElement) {
    this.searchTerm = searchInputEl.value;
    this.getQuestions(this.searchTerm);
    searchInputEl.value = '';
    console.log(this.searchTerm);
  }

  // getQuestions(searchTerm: string){
  //   this.questionsService.getQuestions(searchTerm)
  //     .subscribe(questions => {
  //       this.questions = questions;
  //       this.questionsService.setQuestions(questions);
  //       console.log(questions)
  //     });
  // }

  onPageChange(currentPage: number){
    this.paginationConfig.currentPage = currentPage;
  }

  setCurrentPage(): void {
    this.paginationConfig.currentPage = this.questionsService.currentPageTrack;
  }

  onQuestionClick(questionId): void {
    this.questionsService.currentPageTrack = this.paginationConfig.currentPage;
    this.router.navigateByUrl(`/questions/${questionId}`);
  }
 
}
