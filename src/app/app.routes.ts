import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'',loadComponent:()=>import('./components/solicitud/solicitud').then(m =>m.Solicitud)}
   
    
];
