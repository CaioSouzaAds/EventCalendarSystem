import { EventData } from './../../../models/eventData.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EventService } from 'src/app/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTimeFormatPipe } from '../../../helpers/DataTimeFormat.pipe';
import { AccountService } from 'src/app/services/account.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
  providers: [DataTimeFormatPipe],
})
export class EventDetailsComponent implements OnInit {
  form: FormGroup;
  evento?: EventData;
  state = 'post';
  eventId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private eventService: EventService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private dateFormatPipe: DataTimeFormatPipe,
    private accountService: AccountService
  ) {
    this.form = this.fb.group({
      eventName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadEvent();
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 300);
  }

  loadEvent(): void {
    const eventIdParam = this.activatedRouter.snapshot.paramMap.get('id');
    if (eventIdParam) {
      this.eventId = +eventIdParam;
      this.state = 'put';
      this.eventService.getEventById(this.eventId).subscribe({
        next: (eventData: EventData) => {
          this.spinner.hide();
          this.evento = eventData;
          this.form.patchValue({
            eventName: eventData.eventName,
            startDate: this.dateFormatPipe.transform(
              eventData.startDate,
              'yyyy-MM-ddTHH:mm'
            ),
            endDate: this.dateFormatPipe.transform(
              eventData.endDate,
              'yyyy-MM-ddTHH:mm'
            ),
          });
        },
        error: () => {
          this.toastr.error('Erro ao carregar detalhes do evento.');
          this.spinner.hide();
        },
      });
    } else {
      this.spinner.hide();
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.value;

      if (this.state === 'put' && this.eventId !== null) {
        this.eventService.putEvent(this.eventId, formData).subscribe({
          next: () => {
            this.toastr.success('Evento atualizado com sucesso!');
            this.router.navigate(['/events/list']);
          },
          error: (error: any) => {
            console.error(error);
            this.toastr.error('Ocorreu um erro ao atualizar o evento.');
          },
        });
      } else {
        this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
          if (user && user.id) {
            // Correção aplicada aqui: separar userId e eventData como dois argumentos
            this.eventService.postEvent(user.id, formData).subscribe({
              next: () => {
                this.toastr.success('Evento salvo com sucesso!');
                this.router.navigate(['/events/list']);
              },
              error: (error: any) => {
                console.error(error);
                this.toastr.error('Ocorreu um erro ao salvar o evento.');
              },
            });
          } else {
            this.toastr.error(
              'Usuário não identificado. Por favor, faça login novamente.'
            );
          }
        });
      }
    } else {
      this.toastr.error(
        'Por favor, preencha o formulário corretamente.',
        'Formulário Inválido!'
      );
    }
  }

  get f(): any {
    return this.form.controls;
  }

  resetForm(): void {
    this.form.reset();
    this.router.navigate(['/events/list']);
  }
}
