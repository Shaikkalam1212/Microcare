import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { OpComponent } from './op/op.component';
import { PatientsComponent } from './patients/patients.component';
import { HttpClientModule } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { StaffComponent } from './staff/staff.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'home', component: HomeComponent },
    { path: 'op', component: OpComponent },
    { path: 'patients', component: PatientsComponent },
    { path: 'staff', component: StaffComponent },

    
];
bootstrapApplication(PatientsComponent, {
    providers: [HttpClientModule],
  });