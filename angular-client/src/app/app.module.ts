import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CommonService } from './common.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { DateFormatPipe } from '../pipes/date-format.pipe';
import { SharedService } from '../services/shared.service';
import { FilterPipe } from '../pipes/filter.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FindTaskByIdPipe } from '../pipes/findTaskById.pipe';
import { NgbDateFRParserFormatter } from './ngb-date-for-parser-formatter';
import { Ng5SliderModule } from 'ng5-slider';
import { ModalComponent } from '../modal/modal.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent, AddTaskComponent, ViewTaskComponent, FilterPipe, FindTaskByIdPipe, ModalComponent, HeaderComponent, FooterComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, AppRoutingModule, NgbModule, Ng5SliderModule
  ],
  entryComponents: [ ModalComponent ],
  providers: [ CommonService, DateFormatPipe, SharedService, FilterPipe, FindTaskByIdPipe, NgbDateFRParserFormatter ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
