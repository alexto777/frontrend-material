import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'estudiantes',
        loadComponent: () =>
          import('./pages/estudiantes/estudiantes.component')
            .then(m => m.EstudiantesComponent)
      },
      {
        path: 'profesores',
        loadComponent: () =>
          import('./pages/profesores/profesores.component')
            .then(m => m.ProfesoresComponent)
      },
      {
        path: 'notas',
        loadComponent: () =>
          import('./pages/notas/notas.component')
            .then(m => m.NotasComponent)
      },
      { path: '', redirectTo: 'estudiantes', pathMatch: 'full' }
    ]
  }
];
