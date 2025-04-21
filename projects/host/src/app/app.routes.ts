import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {
        path: 'api-demo',
        loadComponent: () =>
            loadRemoteModule({
                remoteEntry: `http://localhost:4201/remoteEntry.js`,
                type: 'module',
                exposedModule: './Component',
            })
                .then((m) => m.AppComponent)
                .catch((err) => console.error(err)),
    },
    {
        path: 'demo',
        loadComponent: () =>
            loadRemoteModule({
                remoteEntry: `http://localhost:4203/remoteEntry.js`,
                type: 'module',
                exposedModule: './Component',
            })
                .then((m) => m.AppComponent)
                .catch((err) => console.error(err)),
    },
    {
        path: 'tictactoe',
        loadComponent: () =>
            loadRemoteModule({
                remoteEntry: `http://localhost:4202/remoteEntry.js`,
                type: 'module',
                exposedModule: './Component',
            })
                .then((m) => m.AppComponent)
                .catch((err) => console.error(err)),
        children: [
            {
                path: 'user-information/:player',
                loadComponent: () => import('../../../tictactoe/src/app/user-form/user-form.component').then((m) => m.UserFormComponent),
            },
            {
                path: 'tic-tac-toe',
                loadComponent: () => import('../../../tictactoe/src/app/tictactoe/tictactoe.component').then((m) => m.TictactoeComponent),
            },
            {
                path: 'results',
                loadComponent: () => import('../../../tictactoe/src/app/result-screen/result-screen.component').then((m) => m.ResultScreenComponent),
            },
        ]
    },
];
