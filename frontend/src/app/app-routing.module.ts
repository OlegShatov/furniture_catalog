import { ItemcardComponent } from './itemcard/itemcard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogComponent } from './catalog';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';

const routes: Routes = [
    { path: '', component: CatalogComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'itemcard/:id', component: ItemcardComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
