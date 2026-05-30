import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { QuizService, Pergunta } from '../../services/quiz';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class GamePage implements OnInit {

  perguntas: Pergunta[] = [];
  indexAtual: number = 0;
  isFlipped: boolean = false; 
  cardRespondido: boolean = false; 

  constructor(public quizService: QuizService, private router: Router) {}

  ngOnInit() {
    this.perguntas = this.quizService.getPerguntasRodada();
    
    if (this.perguntas.length === 0) {
      this.router.navigate(['/home']);
    }
  }

  virarCard() {
    this.isFlipped = !this.isFlipped;
  }

  votarResposta(sabia: boolean) {
    if (sabia) {
      this.quizService.incrementarPontuacao();
    }
    this.cardRespondido = true;
    
    setTimeout(() => {
      this.proximoCard();
    }, 800);
  }

  proximoCard() {
    if (this.indexAtual < this.perguntas.length - 1) {
      this.indexAtual++;
      this.isFlipped = false;
      this.cardRespondido = false;
    } else {
      this.router.navigate(['/results']);
    }
  }

  voltarCard() {
    if (this.indexAtual > 0) {
      this.indexAtual--;
      this.isFlipped = false;
      this.cardRespondido = false;
    }
  }
}