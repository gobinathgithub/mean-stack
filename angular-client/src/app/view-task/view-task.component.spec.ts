import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { ViewTaskComponent } from './view-task.component';
import { SharedService } from '../../services/shared.service';
import { ModalComponent } from '../../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../common.service';
import { HttpModule, Http, ConnectionBackend, BaseRequestOptions} from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from '../../pipes/filter.pipe';
import { FindTaskByIdPipe } from '../../pipes/findTaskById.pipe';
import { Router, RouterModule, Routes, ActivatedRoute  } from '@angular/router';
import { RouterTestingModule  } from '@angular/router/testing';
import { AddTaskComponent } from '../add-task/add-task.component';
import { MockBackend } from '@angular/http/testing';
import { getTask } from '../unit-test/mockResponse/mockGetTask';
import { Observable } from 'rxjs';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { By } from '@angular/platform-browser';
import { taskModal } from '../unit-test/mockRequest/taskModal';

describe('ViewTaskComponent', () => {
  let specObj: any = {};
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: {  } }
  } as ActivatedRoute;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, FormsModule, NgbModule, RouterTestingModule],
      declarations: [ ViewTaskComponent, FilterPipe, FindTaskByIdPipe ],
      providers: [SharedService, CommonService, MockBackend, BaseRequestOptions, DateFormatPipe,
        {
          provide: Http, useFactory: function (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        {provide: ActivatedRoute, useClass: fakeActivatedRoute}
      ]
    })
    .compileComponents();
  });
  
  beforeEach(() => {
    specObj.task = getTask.data;
    specObj.taskData = getTask;
    specObj.fixture = TestBed.createComponent(ViewTaskComponent);
    specObj.component = specObj.fixture.componentInstance;
    specObj.fixture.detectChanges();
  });

  it('should create', () => {
    expect(specObj.component).toBeTruthy();
  });

  it('when click edit button, should navigate to edit task screen', () => {
    spyOn(specObj.component.router, 'navigateByUrl').and.returnValue(true);
    specObj.component.editTask(specObj.task[0]);
    expect(specObj.component.router.navigateByUrl).toHaveBeenCalledWith('/add-task');
  });

  it('when click end task button, should end the corresponding task',  inject([CommonService], (commonService: CommonService) => {
    spyOn(commonService, 'saveTask').and.returnValue(Observable.of(taskModal.data));
    specObj.component.endTask(specObj.task[1]);
    expect(commonService.saveTask).toHaveBeenCalled();
  }));
});