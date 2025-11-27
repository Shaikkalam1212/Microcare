 import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

interface Patient {
  id: string;
  opno: number;
  name: string;
  age: number;
  number: string;
  doctor: string;
  referal: string;
  address: string;
  appointmentTime: string;
}

@Component({
  selector: 'app-op',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './op.component.html',
  styleUrls: ['./op.component.css']
})

export class OpComponent implements OnInit {

  apiUrl = "https://localhost:7023/api/Appointments";

  patientRecords: Patient[] = [];
  isEditMode = false;

  patientForm: Patient = {
    id: "",
    opno: 0,
    name: "",
    age: 0,
    number: "",
    doctor: "",
    referal: "",
    address: "",
    appointmentTime: ""
  };

  constructor(private http: HttpClient) {}
  searchOpNo: string = '';          // New property for search
allPatientRecords: Patient[] = []; 
  ngOnInit() {
    this.getAppointments();
  }

 // Load all data
  // getAppointments() {
  //   this.http.get<Patient[]>(this.apiUrl)
  //     .subscribe(res => {
  //       this.patientRecords = res;
  //     });
  // }

  getAppointments() {
  this.http.get<Patient[]>(this.apiUrl)
    .subscribe(res => {
      this.patientRecords = res;
      this.allPatientRecords = res;  // Save original list
    });
}

  // Open modal for new record
  openCreateModal() {
    this.resetForm();
    this.isEditMode = false;

    const modal = document.getElementById("createModal");
    if (modal) new bootstrap.Modal(modal).show();
  }

  // Edit existing record
  editRecord(record: Patient) {
    this.patientForm = { ...record };
    this.isEditMode = true;

    const modal = document.getElementById("createModal");
    if (modal) new bootstrap.Modal(modal).show();
  }

  
  // Save button
  saveRecord() {
    if (this.isEditMode) {
      this.updateRecord();
    } else {
      this.createRecord();
    }
  }

  // Create
 createRecord() {

  const body = {
    opno: this.patientForm.opno,
    name: this.patientForm.name,
    age: this.patientForm.age,
    number: this.patientForm.number,
    doctor: this.patientForm.doctor,
    referal: this.patientForm.referal,
    address: this.patientForm.address,
    appointmentTime: this.patientForm.appointmentTime
  };

  this.http.post(this.apiUrl, body)
    .subscribe(() => {
      this.getAppointments();   // Refresh table
      this.resetForm();
      this.closeModal();
    });
}

  // Update (delete + recreate)
 updateRecord() {

  const body = {
    opno: this.patientForm.opno,
    name: this.patientForm.name,
    age: this.patientForm.age,
    number: this.patientForm.number,
    doctor: this.patientForm.doctor,
    referal: this.patientForm.referal,
    address: this.patientForm.address,
    appointmentTime: this.patientForm.appointmentTime
  };
 }

  // Delete
  deleteRecord(record: Patient) {
    if (confirm(`Delete appointment for ${record.name}?`)) {
      this.http.delete(`${this.apiUrl}/${record.opno}`)
        .subscribe(() => {
          this.getAppointments();
        });
    }
  }

  resetForm() {
    this.patientForm = {
      id: "",
      opno: 0,
      name: "",
      age: 0,
      number: "",
      doctor: "",
      referal: "",
      address: "",
      appointmentTime: ""
    };
    this.isEditMode = false;
  }

  closeModal() {
    const modalEl = document.getElementById("createModal");
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal?.hide();
  }
  filterByOpNo() {
  if (!this.searchOpNo) {
    this.patientRecords = this.allPatientRecords;
  } else {
    const search = this.searchOpNo.toLowerCase();
    this.patientRecords = this.allPatientRecords.filter(rec =>
      rec.opno.toString().includes(search)
    );
  }
}
}
