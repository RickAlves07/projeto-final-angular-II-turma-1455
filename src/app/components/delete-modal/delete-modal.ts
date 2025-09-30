import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal',
  imports: [],
  templateUrl: './delete-modal.html',
  styleUrl: './delete-modal.scss'
})
export class DeleteModal {
  @Input() title!: string;

  constructor(public activeModal: NgbActiveModal) {}
}
