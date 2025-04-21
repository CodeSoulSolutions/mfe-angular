import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WinningState } from '../utils/enum';
import { HeaderComponent } from "../components/header/header.component";
import { UserStateService } from '../services/user-statemanagement.service';


@Component({
  selector: 'app-result-screen',
  imports: [CommonModule],
  providers:[UserStateService],
  templateUrl: './result-screen.component.html',
  styleUrl: './result-screen.component.css'
})
export class ResultScreenComponent {
  playerX = WinningState.PLAYERX
  playerO = WinningState.PLAYERO
  gameResults: any = null
  gameResults_title: string = '';

  playerXDetails: any = null;
  playerODetails: any = null;

  playerXWon: boolean = false;
  playerOWon: boolean = false;

  players: Array<{ name: string, score: number }> = [
    { name: 'Player X', score: 65 },
    { name: 'Player O', score: 48 },
    { name: 'Player Y', score: 39 }
  ];

  // newPlayerName: string = '';

  constructor(private userState: UserStateService) {
    this.gameResults = this.userState.getWinnerDetails();
    this.displayResults();
  }

  displayResults() {
    if (this.gameResults != null) {
      switch (this.gameResults.winningState) {
        case WinningState.PLAYERX:
          this.gameResults_title = 'Player X won!';
          this.playerXDetails = this.gameResults.user_x;
          this.playerXWon = true;
          return;
        case WinningState.PLAYERO:
          this.gameResults_title = 'Player O won!';
          this.playerODetails = this.gameResults.user_o;
          this.playerOWon = true;
          return;
      }
    }
    this.gameResults_title = 'Game draw!';
    this.playerXDetails = this.gameResults.user_x;
    this.playerODetails = this.gameResults.user_o;
    this.playerXWon = true;
    this.playerOWon = true;
  }

}
