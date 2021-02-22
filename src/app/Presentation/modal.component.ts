import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'app-modal',
    template: `
    <div class="modal" role="dialog" [ngClass]="{'show': isShow}">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Terms and Condition</h5>
            <button type="button" class="close" aria-label="Close" (click)="onCloseModal()">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    </div>
    `,
    styles: [ `.modal.show { display: block; overflow: auto } `]
})

export class ModalComponent {
    @Input('isShow') isShow: boolean;
    @Output() changeShowValue = new EventEmitter<boolean>();
    constructor() { }

    onCloseModal() {
        this.isShow = false;
        this.changeShowValue.emit(this.isShow)
    }

}
