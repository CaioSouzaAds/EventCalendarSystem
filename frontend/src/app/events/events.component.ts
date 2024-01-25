import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { User } from '../models/user.model';
import { EventService } from '../services/event-service.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  modalRef!: BsModalRef;

  users: User[] = [];
  originalUsers: User[] = [];
  listFilter: string = '';

  constructor(
    private eventService: EventService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 5000);

    this.eventService.loadUsers().subscribe((data: User[]) => {
      this.users = data;
      this.originalUsers = data;
    });
  }

  openDeleteModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  deleteEvent(): void {
    //console.log('Evento excluído');
    this.toastr.success('Evento deletado com sucesso', 'Deletado!');
  }

  get noEventsFound(): boolean {
    return (
      this.users.length === 0 ||
      this.users.every((user) => user.events.length === 0)
    );
  }

  filterUsers(): void {
    this.users = this.eventService.filterUsers(this.listFilter.trim());
  }
}
