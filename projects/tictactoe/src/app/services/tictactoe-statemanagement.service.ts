import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TictactoeStateService {
  private cells: string[] = Array(9).fill('');
  private currentPlayer: string = 'X';

  getCells(): string[] {
    return [...this.cells]; 
  }

  getCurrentPlayer(): string {
    return this.currentPlayer;
  }

   makeMove(index: number): string | null {
    if (!this.cells[index]) {
      this.cells[index] = this.currentPlayer;
      const previousPlayer = this.currentPlayer;
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      return previousPlayer;
    }
    return null;
  }

  resetGame(): void {
    this.cells = Array(9).fill('');
    this.currentPlayer = 'X';
  }
}
