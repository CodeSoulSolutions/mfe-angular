import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { checkWinner } from '../utils/tictactoe-algorithm';
import { CommonModule } from '@angular/common';
import { WinningState } from '../utils/enum';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UserStateService } from '../services/user-statemanagement.service';
import { TictactoeStateService } from '../services/tictactoe-statemanagement.service';

@Component({
  selector: 'app-tictactoe',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  providers:[TictactoeStateService, UserStateService],
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.css']
})
export class TictactoeComponent implements OnChanges {
  cells: string[] = [];
  currentPlayer: string = '';
  playerXDetails: any = null;
  playerODetails: any = null;

  constructor(
    private tictactoeStateService: TictactoeStateService,
    private userState: UserStateService,
    private router: Router
  ) {
    this.cells = this.tictactoeStateService.getCells();
    this.currentPlayer = this.tictactoeStateService.getCurrentPlayer();
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    console.log('ngOnInit: Component initialized');
    console.log('user details in tic tac toe component - ', this.userState.getUserDetails());
    this.playerXDetails = new UserStateService().getUserDetails().user_x
    this.playerODetails = this.userState.getUserDetails().user_o
  }

  makeMove(index: number): void {
    const previousPlayer = this.tictactoeStateService.makeMove(index);
    if (previousPlayer) {
      this.cells = this.tictactoeStateService.getCells();
      this.currentPlayer = this.tictactoeStateService.getCurrentPlayer();

      const result = checkWinner(this.cells);
      if (result === 'X') {
        console.log('x wins')
        this.userState.setWinningState(WinningState.PLAYERX);
        this.router.navigate(['/tictactoe/results']);
      } else if (result === 'O') {
        console.log('o wins')
        this.userState.setWinningState(WinningState.PLAYERO);
        this.router.navigate(['/tictactoe/results']);
      } else if (result === 'draw') {
        console.log('draw')
        this.userState.setWinningState(WinningState.DRAW);
        this.router.navigate(['/tictactoe/results']);
      }
    }
  }

  resetGame(): void {
    this.tictactoeStateService.resetGame();
    this.cells = this.tictactoeStateService.getCells();
    this.currentPlayer = this.tictactoeStateService.getCurrentPlayer();
  }

  editPlayer(player: string): void {
    this.router.navigate([`/tictactoe/user-information/${player}-edit`]);
  }
}
