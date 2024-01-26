import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent {
  @Input() titulo: string = '';
  @Input() iconClass: string = 'fa fa-user';
  @Input() caption: string = 'Desde 2024';
  @Input() listButton: boolean = false;

  constructor(private router: Router) {}

  listar(): void {
    this.router.navigate([`/${this.titulo.toLowerCase()}/list`]);
  }
}
