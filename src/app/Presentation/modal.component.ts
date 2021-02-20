import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'app-modal',
    template: `
    <div class="modal" role="dialog" [ngClass]="{'show': isShow}">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Terms and Condition</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" (click)="onCloseModel()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p><ng-content></ng-content></p>
      </div>
      <!-- <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" (click)="onCloseModel()">Close</button>
      </div> -->
    </div>
  </div>
</div>
    `,
    styles: [
        `
        .modal.show {
            display: block;
        }
        `
    ]
})

export class ModalComponent {
    @Input('isShow') isShow: boolean;
    @Output() changeShow = new EventEmitter<boolean>();
    constructor() {

    }

    onCloseModel() {
        this.isShow = false;
        this.changeShow.emit(this.isShow)
    }

}