import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { ListarComponent } from './listar';
import { EditarComponent } from './editar';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_helpers';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'editar/:codigo', component: EditarComponent },
    { path: 'listar', component: ListarComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
