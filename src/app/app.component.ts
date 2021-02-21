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
  userRole: string = 'admin'
  showModal: boolean = false;
  roles: any = (data as any).default.roles;
  doc = new jsPDF({
    orientation: 'p',
    unit: 'pt',
    format: 'a4',
  })

  constructor() { }

  ngOnInit() {
    let currentRoleMatch = this.roles.filter(role => role.name === this.userRole);
    if (currentRoleMatch.length > 0) {
      this.tncContent = currentRoleMatch[0].tnc;
    }
  }

  showTnC() {
    if (this.tncContent) {
      this.doc.fromHTML(this.tncContent, 30,30, { 'width': 550});
      this.doc.save("Terms.pdf");
    }
  }

  openModal() {
    this.showModal = true;
  }

  onChange(value: boolean) {
    this.showModal = value;
  }
}
