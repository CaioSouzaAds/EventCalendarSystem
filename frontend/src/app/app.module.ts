import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { DataTimeFormatPipe } from './helpers/DataTimeFormat.pipe';
import { NavComponent } from './nav/nav.component';
import { EventService } from './services/event-service.service';

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    NavComponent,
    DataTimeFormatPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbCollapseModule,
    NgbModule,
    FormsModule,
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  providers: [EventService],
  bootstrap: [AppComponent],
})
export class AppModule {}
