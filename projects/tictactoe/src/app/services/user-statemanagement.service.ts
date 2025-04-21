

import { Injectable } from '@angular/core';
import { UserModel } from '../models/user-model';
import { WinningState } from '../utils/enum';

@Injectable({
    providedIn: 'root',
})
export class UserStateService {
    user_x: UserModel = new UserModel();
    user_o: UserModel = new UserModel();
    winner: WinningState | null = null;

    setUserX(userDetails: any) {
        this.user_x = userDetails;
    }

    setUserO(userDetails: any) {
        this.user_o = userDetails;
    }

    getUserDetails() {
        return {
            user_x: this.user_x,
            user_o: this.user_o
        }
    }

    setWinningState(details: WinningState) {
        this.winner = details;
        console.log('winner - ', this.winner)
    }

    getWinnerDetails() {
        if (this.winner != null) {
            switch (this.winner) {
                case WinningState.PLAYERX: {
                    return { winningState: WinningState.PLAYERX, user_x: this.user_x };
                }
                case WinningState.PLAYERO: {
                    return { winningState: WinningState.PLAYERO, user_o: this.user_o };
                }
            }
        }

        return { winningState: WinningState.DRAW, user_x: this.user_x, user_o: this.user_o };
    }
}
