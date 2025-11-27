export interface Appointment {
  id: string;               // GUID from backend
  opno: number;             // OP number
  name: string;             // Patient name
  age: number;              // Patient age
  number: string;           // Phone number as string
  doctor: string;           // Doctor name
  referral: string;         // Correct spelling
  address: string;          // Address
  appointmentTime: string;  // ISO string for datetime
}
