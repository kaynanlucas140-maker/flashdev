import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { QuizService } from '../../services/quiz';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule] 
})
export class HomePage {

  listaDecks = [
    { nome: 'HTML 5', sub: 'ESTRUTURA & SEMÂNTICA', classe: 'html-theme', id: 'html-theme' },
    { nome: 'CSS 3', sub: 'ESTILIZAÇÃO & FLEXBOX', classe: 'css-theme', id: 'css-theme' },
    { nome: 'JAVASCRIPT', sub: 'LÓGICA & DOM', classe: 'js-theme', id: 'js-theme' },
    { nome: 'GIT & GITHUB', sub: 'VERSIONAMENTO', classe: 'git-theme', id: 'git-theme' },
    { nome: 'IONIC & ANGULAR', sub: 'MOBILE APPS', classe: 'ionic-theme', id: 'ionic-theme' }
  ];

  constructor(private quizService: QuizService, private router: Router) {}

  jogarDeck(temaId: string) {
    this.quizService.iniciarRodada(temaId);
    
    this.router.navigate(['/game']);
  }
}