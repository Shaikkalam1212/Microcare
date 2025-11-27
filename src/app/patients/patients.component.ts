import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // For ngFor
import { FormsModule } from '@angular/forms';    // For ngModel

// Define the Patient interface
interface Patient {
  name: string;
  age: number | null;
  mrNo: number | null;
  opNo: string;
  date: string;
  surgery: string;
  surgeon: string;
  remarks: string;
}

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Make sure these modules are imported
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
})
export class PatientsComponent {
  // Patient form model
  patientForm: Patient = {
    name: '',
    age: null,
    mrNo: null,
    opNo: '',
    date: '',
    surgery: '',
    surgeon: '',
    remarks: '',
  };

  // List to store all registered patients with sample data
  patientRecords: Patient[] = [
    {
      name: 'John Doe',
      age: 32,
      mrNo: 1001,
      opNo: 'OP1234',
      date: '2025-03-15',
      surgery: 'Knee Surgery',
      surgeon: 'Dr. Smith',
      remarks: 'Patient recovering well',
    },
    {
      name: 'Jane Smith',
      age: 29,
      mrNo: 1002,
      opNo: 'OP1235',
      date: '2025-03-10',
      surgery: 'Appendectomy',
      surgeon: 'Dr. Williams',
      remarks: 'Patient discharged with follow-up in 1 week',
    },
    {
      name: 'Alex Johnson',
      age: 45,
      mrNo: 1003,
      opNo: 'OP1236',
      date: '2025-02-25',
      surgery: 'Heart Bypass',
      surgeon: 'Dr. Lee',
      remarks: 'Post-op monitoring required',
    },
    {
      name: 'Olivia Brown',
      age: 38,
      mrNo: 1004,
      opNo: 'OP1237',
      date: '2025-03-12',
      surgery: 'Hip Replacement',
      surgeon: 'Dr. Adams',
      remarks: 'Physical therapy recommended',
    },
    {
      name: 'Michael Davis',
      age: 50,
      mrNo: 1005,
      opNo: 'OP1238',
      date: '2025-03-14',
      surgery: 'Back Surgery',
      surgeon: 'Dr. Green',
      remarks: 'Patient showing good improvement',
    },
  ];

  // Flag to check if the form is in edit mode
  isEditMode = false;
  
  // Variable to store the index of the patient being edited
  currentIndex: number | null = null;

  // Save a new record or update an existing one
  saveRecord() {
    if (this.isEditMode && this.currentIndex !== null) {
      // Update the record at the current index
      this.patientRecords[this.currentIndex] = { ...this.patientForm };
    } else {
      // Add a new patient record to the list
      this.patientRecords.push({ ...this.patientForm });
    }

    // Reset the form after saving
    this.resetForm();
  }

  // Pre-fill the form with the data of the patient to be edited
  editRecord(record: Patient, index: number) {
    this.isEditMode = true;
    this.currentIndex = index;
    this.patientForm = { ...record };
    // Optionally, you can parse the date if required
    this.patientForm.date = record.date ? record.date : ''; 
  }

  // Delete the patient record
  deleteRecord(index: number) {
    this.patientRecords.splice(index, 1);
  }

  // Reset the form to its initial empty state
  resetForm() {
    this.patientForm = {
      name: '',
      age: null,
      mrNo: null,
      opNo: '',
      date: '',
      surgery: '',
      surgeon: '',
      remarks: '',
    };
    this.isEditMode = false;
    this.currentIndex = null;
  }
}
