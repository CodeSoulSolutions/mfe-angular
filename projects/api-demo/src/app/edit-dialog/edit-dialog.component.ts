import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../shared/src/lib/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {
  editedData: any;
  oldData: any;

  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editedData = { ...data };
    this.oldData = { ...data }
  }

  save() {
    console.log('edited data - ', this.editedData)
    this.apiService.editData(this.oldData, this.editedData).subscribe(
      (response) => {
        console.log('edit response - ', response);
      },
      (error) => {
        console.error('error in edit - ', error);
      }
    );

    this.dialogRef.close(this.editedData);
  }

  close() {
    this.dialogRef.close();
  }
}
