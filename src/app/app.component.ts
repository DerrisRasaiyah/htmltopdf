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
  userRole: string = 'hcp'
  showModal: boolean = false;
  roles: any = (data as any).default.roles;
  doc = new jsPDF({
    orientation: 'p',
    unit: 'pt',
    format: 'a4',

  });
  constructor() { }
  ngOnInit() {
    let currentRoleMatch = this.roles.filter(role => role.name === this.userRole);
    if (currentRoleMatch.length > 0) {
      this.tncContent = currentRoleMatch[0].tnc;
      console.log(this.tncContent);
    }
  }

  showTnC() {
    if (this.tncContent) {

      // this.doc.text("Lorem Ipsum is simply dummy text of the printing and typesetting industry.,\n" + "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum", 100, 100)
      // this.doc.save("exp.pdf")

      this.doc.html(this.tncContent, {
        callback: function (doc) {
          doc.setLineWidth(200)
          doc.save("demo1.pdf");
        },
        margin: 100
      })
    }
  }

  openModal() {
    this.showModal = true;
  }

  onChange(value: boolean) {
    this.showModal = value;
  }
}
