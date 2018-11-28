import { Component, OnInit, Injectable } from '@angular/core';
import { CommonService } from '../common.service';
import { Observable } from 'rxjs/index';
import { debounceTime, map } from 'rxjs/operators';
import { SharedService } from '../../services/shared.service';
import { Tasks } from '../../model/task';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { NgbDate, NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from '../ngb-date-for-parser-formatter';
import { Options } from 'ng5-slider';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
@Injectable()
export class AddTaskComponent implements OnInit {
  public valButton: any;
  private errorMessage: any;
  private taskValues:  any;
  public task: Tasks;
  private parents: {_id: string, task: string}[];
  public selectedParent: any;
  public search: any;
  public formatter: any;
  private previousParent: any;
  public hoveredDate: NgbDate;
  private fromDate: NgbDate;
  private toDate: NgbDate;
  public submitted: Boolean = false;
  public priorty: Number = 0;
  public priortyValidation: Boolean = false;
  private priortyBar: any;
  public priortyOptions: Options = {
    floor: 0,
    ceil: 30,
    step: 1,
    minLimit: 1,
    maxLimit: 30
  };

  constructor(private taskService: CommonService, private shared: SharedService,
    private _date: DateFormatPipe, calendar: NgbCalendar, private _dateParser: NgbDateFRParserFormatter,
    private modalService: NgbModal) {
      this.taskValues = this.shared.TaskModel; // TaskModel should have the information when we select Edit Task
      // Change fromDate to valid formate to append the date picker when we edit the task information
      this.fromDate = (this.taskValues && this.taskValues.fromDate) ?
        NgbDate.from(this._dateParser.parse(this._date.transform(this.taskValues.fromDate, 'yyyy/MM/dd'))) :
        calendar.getToday();
      // Change toDate to valid formate to append the date picker when we edit the task information
      this.toDate = (this.taskValues && this.taskValues.toDate) ?
        NgbDate.from(this._dateParser.parse(this._date.transform(this.taskValues.toDate, 'yyyy/MM/dd'))) :
        calendar.getNext(calendar.getToday(), 'd', 10);
  }

  /**
   * This method should call when we select the date
   * @param date - should have both fromDate and toDate
   */
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  /**
   * This method should call when we hover in date selection
   * @param date - should have both fromDate and toDate
   */
  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  /**
   * This method should call when we select any dates from date picker
   * @param date - should have both fromDate and toDate
   */
  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  /**
   * This method should call when we select fromDate and toDate to check valid date
   * @param date - should have both fromDate and toDate
   */
  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  /**
   * When component initialize fetch the modal data
   */
  ngOnInit() {
    this.priortyBar = document.getElementsByClassName('ng5-slider-span ng5-slider-bar');
    this.taskValues = this.shared.TaskModel;
    this.ngBootstrapTypeahead();
    this.findAllTasks();
    this.valButton = this.taskValues ? 'Save' : 'Add';
    this.task = (this.taskValues && this.taskValues.task) ? this.taskValues.task : '';
    this.priorty = (this.taskValues && this.taskValues.priorty) ? this.taskValues.priorty : '0';
    if (this.priorty > 0) {
      this.priortyBar[2]['style'].backgroundColor = '#42A948';
    }
  }

  /**
   * This method is used to get parent task information when we edit the task from view task screen
   */
  findAllTasks() {
    this.taskService.getTask().subscribe((res: any) => {
      if (res) {
        this.parents = JSON.parse(JSON.stringify(res.data));
        if (this.taskValues && this.taskValues.parent) {
          this.previousParent = this.parents.find((item) => (item._id === this.taskValues.parent));
          this.selectedParent = this.previousParent;
        }
      }
    },
    (error) => {
      this.errorMessage = error;
      console.log('Error...!!');
      const titleText = 'Oops..!!';
      const info = 'Sorry we are having some issue. Please try after sometime..!!';
      this.openModal(info, titleText);
    });
  }

  /**
   * This method should call to bring Parent Task informations when component initialize
   */
  ngBootstrapTypeahead() {
    this.search = (text$: Observable<string>) =>
    text$.pipe(debounceTime(200), map(term => term === '' ? [] : this.parents.filter(parent =>
        parent.task.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
    ));
    this.formatter = (a: {task: string}) => {
      return a.task;
    };
  }

  /**
   * This method should trigger when click Add Task/Save Task buttons and store the informations in DB
   * @param task - Task informations which we entered in screen
   */
  addTask(task) {
    this.submitted = true;
    task.priorty = task.priorty ? task.priorty : '0';
    this.priortyValidationMethod();
    if (task.task && !this.priortyValidation) {
      if (this.taskValues && this.taskValues._id) {
        task._id = this.taskValues._id;
      }
      if (!!this.selectedParent) {
        task.parent = this.selectedParent._id;
      }
      if (!task.parent) {
        task.parent = undefined;
      }
      task.mode = this.valButton;
      task.fromDate = this._dateParser.format(this.fromDate);
      task.toDate = this._dateParser.format(this.toDate);
      if (this.valButton == "Add") {
        this.taskService.addTask(task).subscribe(
          (data) => {
            if (!data.errmsg && !data.message) {
              const titleText = 'Your task added successfully..!!';
              this.openModal(data.data, titleText, '/view-task');
            } else {
              const titleText = 'Failed to add your task..!!';
              this.openModal(data.errmsg, titleText);
            }
        }, (error) => {
          this.errorMessage = error;
          this.serverFailingAdd();
        });
      } else if (this.valButton == "Save") {
        this.taskService.saveTask(task).subscribe(
          (data) => {
            if (!data.errmsg && !data.message) {
              const titleText = 'Your task updated successfully..!!';
              this.openModal(data.data, titleText, '/view-task');
            } else {
              const titleText = 'Failed to update your task..!!';
              this.openModal(data.errmsg, titleText);
            }
        }, (error) => {
          this.errorMessage = error;
          this.serverFailingAdd();
        });
      }
    }
  }

  /**
   * Add Task server error
   */
  serverFailingAdd() {
    console.log('Error...!!');
    const titleText = 'Oops..!!';
    const info = 'Sorry we are not able to add the Task informations. Please try after sometime..!!';
    this.openModal(info, titleText);
  }

  /**
   * To check wheather Proirty value is selected or not. If not this method should trigger the validation message and
   * change the slider background color
   */
  priortyValidationMethod() {
    if (this.priorty < 1 || this.priorty > 30) {
      this.priortyValidation = true;
      this.priortyBar[2]['style'].backgroundColor = '#a94442';
    } else {
      this.priortyValidation = false;
      this.priortyBar[2]['style'].backgroundColor = '#42A948';
    }
  }

  /**
   * When change Priorty value in slider this method should call to change the slider color
   */
  priortyChange() {
    this.priortyValidation = false;
    this.priortyBar[2]['style'].backgroundColor = '#42A948';
  }

  /**
   * Open Modal window
   * @param content - Title of the modal
   * @param title - Content of the modal
   * @param path - Path should navigate when click Ok/Close button in modal
   */
  openModal(content, title, path ?: String) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    modalRef.componentInstance.path = path;
  }
}
