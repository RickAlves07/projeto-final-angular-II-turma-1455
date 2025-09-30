import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-modal',
  imports: [TranslateModule],
  templateUrl: './delete-modal.html',
  styleUrl: './delete-modal.scss'
})
export class DeleteModal {
  @Input() title!: string;

  constructor(public activeModal: NgbActiveModal) {}
}
