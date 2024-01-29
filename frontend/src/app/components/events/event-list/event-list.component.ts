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
  styleUrls: ['./event-list.component.scss'], // Correção: deve ser styleUrls
})
export class EventListComponent implements OnInit {
  modalRef!: BsModalRef;
  users: User[] = [];
  originalUsers: User[] = [];
  listFilter: string = '';
  selectedUserId!: number;
  selectedEventId!: number;
  selectedEventName!: String;

  constructor(
    private eventService: EventService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 300);
    this.loadUsers();
  }

  loadUsers() {
    this.eventService.loadUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
        this.originalUsers = data;
      },
      error: (error) => console.error('Error loading users', error),
    });
  }
  openDeleteModal(
    template: TemplateRef<any>,
    userId: number,
    eventId: number,
    eventName: String
  ): void {
    this.selectedUserId = userId;
    this.selectedEventId = eventId;
    this.selectedEventName = eventName;
    this.modalRef = this.modalService.show(template);
  }

  detailEventId(id: number): void {
    console.log('Navegando para o evento com ID:', id);
    this.router.navigate([`events/details/${id}`]);
  }

  deleteEvent(): void {
    this.eventService.deleteEvent(this.selectedEventId).subscribe({
      next: () => {
        this.toastr.success('Evento deletado com sucesso', 'Deletado!');
        this.updateEventList();
        this.modalRef.hide();
      },
      error: (error) => this.toastr.error('Erro ao deletar o evento', 'Erro!'),
    });
  }

  updateEventList() {
    this.loadUsers();
    this.eventService.loadUsers().subscribe((data: User[]) => {
      this.users = data;
      this.originalUsers = data;
    });
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
