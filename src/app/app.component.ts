import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';

import * as data from './data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tncContent: string;
  //userRole may change depends on authentication [admin, hcp, doctor, nurse]
  userRole: string = 'admin';
  showModal: boolean = false;
  //retrieve the roles from data.json file
  roles: any = (data as any).default.roles;

  constructor() { }

  ngOnInit() {
    //filter out the exact T&C of the user based on his/her role
    let currentRoleMatch = this.roles.filter(role => role.name === this.userRole);
    if (currentRoleMatch.length > 0) {
      this.tncContent = currentRoleMatch[0].tnc;
    }
  }

  showTnC() {
    if (this.tncContent) {
      const pdf = new jsPDF('p', 'pt', 'a4');
      pdf.fromHTML(this.tncContent, 30, 30, {
        width: 540
      }, function () {
        pdf.save("Terms and Conditions.pdf")
      }, {
        top: 30,
        bottom: 30,
        left: 30,
        width: 540
      });
    }
  }

  //send the showModal value to ModalComponent to open the popup
  openModal() {
    this.showModal = true;
  }
  
  //get the showModal value from ModalComponent on close
  onChange(value: boolean) {
    this.showModal = value;
  }
}
