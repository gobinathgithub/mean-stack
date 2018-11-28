import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { ModalComponent } from '../../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  private taskData: any;
  private errorMessage: any;
  constructor(private taskService: CommonService, private router: Router, private shared: SharedService, private modalService: NgbModal) {
    this.shared.TaskModel = undefined; // Set the taskmodel value as empty when updated corresopding task
  }

  /**
   * When page load fetech the task informations from API
   */
  ngOnInit() {
    this.taskService.getTask().subscribe((response: any) => {
        if (response) {
          this.taskData = JSON.parse(JSON.stringify(response.data));
        }
      },
      (error) => {
        this.errorMessage = error;
        console.log('Error...!!');
        const titleText = 'Oops..!!';
        const info = 'Sorry we are not able to fetch the Task informations. Please try after sometime..!!';
        this.openModal(info, titleText);
      });
  }

  /**
   * Edit a corresponding task
   */
  editTask(task) {
    this.shared.TaskModel = task;
    this.router.navigateByUrl('/add-task');
  }

  /**
   * End a corrsponding task, Edit & End Task buttons should be disabled once clicked End Task button
   */
  endTask(task) {
    task.finished = true;
    task.toDate = new Date();
    task.mode = 'Save';
    this.taskService.saveTask(task).subscribe(
      (data) => {
        if (!data.errmsg) {
          const titleText = task.task + ' ended success fully';
          this.openModal(data.data, titleText);
        } else {
          const titleText = task.task + ' failed to update your task..!!';
          this.openModal(data.errmsg, titleText);
        }
    }, error => this.errorMessage = error);
  }

  /**
   * Modal window open when click End Task button
   */
  openModal(content, title) {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
  }
}
