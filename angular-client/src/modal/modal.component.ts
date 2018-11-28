import { Component, Input, OnInit } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() title = `Information`;

  constructor(
    public activeModal: NgbActiveModal, private router: Router,
  ) {}

  ngOnInit() {
  }

  okModel(path) {
    if (path) {
        this.router.navigateByUrl(path);
    }
    this.activeModal.close('Close click');
  }
}
