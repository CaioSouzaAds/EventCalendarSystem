import { EventData } from './../../../models/eventData.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EventService } from 'src/app/services/event-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTimeFormatPipe } from '../../../helpers/DataTimeFormat.pipe';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
  providers: [DataTimeFormatPipe],
})
export class EventDetailsComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  evento?: EventData;
  state = 'post';
  eventId: number | null = null;
  private lastGeneratedId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private eventService: EventService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private dateFormatPipe: DataTimeFormatPipe
  ) {}

  ngOnInit(): void {
    this.buildForm();
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
      this.toastr.error('ID do evento não fornecido.');
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
            this.router.navigate(['/events/list']); // Redirecionar após atualização
          },
          error: (error: any) => {
            console.error(error);
            this.toastr.error('Ocorreu um erro ao atualizar o evento.');
          },
        });
      } else {
        const userId = this.generateRandomUserId();
        this.eventService.postEvent(userId, formData).subscribe({
          next: () => {
            this.toastr.success('Evento salvo com sucesso!');
            this.router.navigate(['/events/list']);
          },
          error: (error: any) => {
            console.error(error);
            this.toastr.error('Ocorreu um erro ao salvar o evento.');
          },
        });
      }
    } else {
      this.toastr.error(
        'Por favor, preencha o formulário corretamente.',
        'Formulário Inválido!'
      );
    }
  }

  buildForm(): void {
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

  get f(): any {
    return this.form.controls;
  }

  resetForm(): void {
    this.form.reset();
  }

  generateRandomUserId(): number {
    let newId;
    do {
      newId = Math.floor(Math.random() * 6) + 1;
    } while (newId === this.lastGeneratedId);

    this.lastGeneratedId = newId;
    return newId;
  }
}
