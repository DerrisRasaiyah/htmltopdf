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
  //userRole may change depends on authendication [admin, hcp, doctor, nurse]
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
      });
      pdf.save("Terms and Consitions.pdf")
      
    }
  }

  openModal() {
    this.showModal = true;
  }

  onChange(value: boolean) {
    this.showModal = value;
  }
}
