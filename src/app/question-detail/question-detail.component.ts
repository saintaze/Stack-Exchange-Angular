import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../questions.interface';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent implements OnInit {
  question: Question;

  constructor(
    private route: ActivatedRoute, 
    private questionsService: QuestionsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getQuestion()
  }

  getQuestion(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    const question = this.questionsService.getQuestion(id);
    this.question = question;
  }

  goBack(): void {
    this.location.back();
  }

}
