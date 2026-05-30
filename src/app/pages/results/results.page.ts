import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { QuizService } from '../../services/quiz';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ResultsPage implements OnInit {

  pontuacaoFinal: number = 0;
  tituloNivel: string = '';
  fraseFeedback: string = '';

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit() {
    this.pontuacaoFinal = this.quizService.getPontuacao();
    this.calcularPatente();
  }

  calcularPatente() {
    if (this.pontuacaoFinal <= 4) {
      this.tituloNivel = 'ESTAGIÁRIO BUGADOR';
      this.fraseFeedback = 'Oops! O compilador venceu esta batalha por hoje. Hora de estudar mais e tentar novamente!';
    } else if (this.pontuacaoFinal <= 7) {
      this.tituloNivel = 'DEV JÚNIOR';
      this.fraseFeedback = 'Bom trabalho! Já consegue fazer commits sem quebrar a aplicação (na maior parte das vezes). Continue treinando!';
    } else if (this.pontuacaoFinal <= 9) {
      this.tituloNivel = 'DEV PLENO';
      this.fraseFeedback = 'Excelente! Esta Dominando muito bem estes conceitos e resolverá bugs como um verdadeiro profissional!';
    } else {
      this.tituloNivel = 'DEV SÊNIOR LENDÁRIO';
      this.fraseFeedback = 'Incrível! Nota máxima! Está pronto para liderar equipes, arquitetar sistemas e remover qualquer bug!';
    }
  }

  voltarParaHome() {
    this.router.navigate(['/home']);
  }
}