import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule],
  template: `
    <mat-toolbar class="toolbar">
      <span class="title">Proyecto Audisoft</span>
      <span class="spacer"></span>
      <span class="user">Admin</span>
    </mat-toolbar>
  `,
  styles: [`
    .toolbar {
      height: 64px;
      background-color: #dc2626; /* rojo Notus */
      color: #ffffff;
      padding: 0 24px;
    }
    .title {
      font-size: 18px;
      font-weight: 600;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .user {
      font-size: 14px;
      opacity: 0.9;
    }
  `]
})
export class ToolbarComponent {}
