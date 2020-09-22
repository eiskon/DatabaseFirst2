import { Injectable } from '@angular/core';
import { Router, CanDeactivate } from '@angular/router';

import { EmployeeEditDialogComponent } from '../employee/employee-edit-dialog/employee-edit-dialog.component';

@Injectable({
    providedIn: 'root'
  })
  export class PreventUnsavedChanges implements CanDeactivate<EmployeeEditDialogComponent> {
    canDeactivate(component: EmployeeEditDialogComponent) {
        if (component.editForm.dirty) {
            return confirm('Are you sure you want to continue? Any unsaved changes wilbe lost');
        }
        return true;
    }
  }
