import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Component } from '@angular/core';
import { AddTaskComponent } from './add-task.component';
import { HttpModule, Http, ConnectionBackend, BaseRequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';
import { NgbModule, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../common.service';
import { SharedService } from '../../services/shared.service'
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { NgbDateFRParserFormatter } from '../ngb-date-for-parser-formatter';
import { getTask } from '../unit-test/mockResponse/mockGetTask';
import { Observable } from 'rxjs';
import { By } from '@angular/platform-browser';
import { taskModal } from '../unit-test/mockRequest/taskModal';
import { Tasks } from '../../model/task';
import { ModalComponent } from '../../modal/modal.component';

describe('AddTaskComponent', () => {
  let specObj: any = {};
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, FormsModule,Ng5SliderModule, NgbModule ],
      declarations: [ AddTaskComponent ],
      providers: [CommonService, SharedService, DateFormatPipe, NgbDateFRParserFormatter, MockBackend, BaseRequestOptions, ModalComponent, NgbModal,
        {
          provide: Http, useFactory: function (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    specObj.task = taskModal.data;
    specObj.fixture = TestBed.createComponent(AddTaskComponent);
    specObj.component = specObj.fixture.componentInstance;
    specObj.fixture.detectChanges();
  });

  it('should create', () => {
    expect(specObj.component).toBeTruthy();
  });

  it('task name should not be empty', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-task')).nativeElement;
    addTaskButton.click();
    expect(specObj.task.task).toBeTruthy();
  });

  it('priorty should be greater than 0', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-task')).nativeElement;
    addTaskButton.click();
    expect(specObj.task.priorty).toBeGreaterThan(0);
  });

  it('priorty should be less than or equal to 30', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-task')).nativeElement;
    addTaskButton.click();
    expect(specObj.task.priorty).toBeLessThanOrEqual(30);
  });

  it('start date should not be empty', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-task')).nativeElement;
    addTaskButton.click();
    expect(specObj.task.fromDate).toBeTruthy();
  });

  it('end date should not be empty', () => {
    let addTaskButton = specObj.fixture.debugElement.query(By.css('#add-task')).nativeElement;
    addTaskButton.click();
    expect(specObj.task.toDate).toBeTruthy();
  });
});