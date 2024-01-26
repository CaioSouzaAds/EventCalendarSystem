import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { EventService } from 'src/app/services/event-service.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
})
export class EventListComponent implements OnInit {
  modalRef!: BsModalRef;

  users: User[] = [];
  originalUsers: User[] = [];
  listFilter: string = '';

  constructor(
    private eventService: EventService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private Router: Router
  ) {}

  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 300);

    this.eventService.loadUsers().subscribe((data: User[]) => {
      this.users = data;
      this.originalUsers = data;
    });
  }

  openDeleteModal(
    template: TemplateRef<any>,
    userId: number,
    eventId: number
  ): void {
    //this.selectedUserId = userId; // Se necessário
    //this.selectedEventId = eventId; // Se necessário
    this.modalRef = this.modalService.show(template);
  }

  detailEventId(id: number): void {
    this.Router.navigate([`events/details/${id}`]);
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
