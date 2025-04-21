import { Component } from '@angular/core';
import { ApiService } from '../../../../shared/src/lib/services/api.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { MatFormField, MatFormFieldControl, MatLabel } from '@angular/material/form-field';
import { MatCard } from '@angular/material/card';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-api-demo',
  templateUrl: './api-demo.component.html',
  styleUrls: ['./api-demo.component.css'],
  providers: [ApiService],
  imports: [CommonModule, MatTableModule, MatFormField, MatCard, MatLabel, FormsModule, MatInputModule, FormsModule, ReactiveFormsModule]
})
export class ApiDemoComponent {
  postResponse: any;
  getResponse: any = [];
  filteredResponse: any[] = [];

  displayedColumns: string[] = ['userId', 'id', 'title', 'body', 'edit', 'delete'];

  newPost = {
    userId: '',
    title: '',
    body: ''
  };
  postForm: any;

  constructor(private apiService: ApiService, private dialog: MatDialog, private fb: FormBuilder) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      userId: ['', Validators.required],
    });
  }

  makePostCall() {
    const payload = this.newPost;

    this.apiService.postData(payload).subscribe(
      (response) => {
        this.postResponse = [response];
        this.getResponse = [...this.getResponse, response];
        this.filteredResponse = [...this.getResponse];
        console.log('post - ', response);
      },
      (error) => {
        console.error('error in post - ', error);
      }
    );
  }

  makeGetCall() {
    this.apiService.getData().subscribe(
      (response) => {
        this.getResponse = response;
        this.filteredResponse = this.getResponse;
        console.log('get - ', response);
      },
      (error) => {
        console.error('error in get - ', error);
      }
    );
  }

  editRow(row: any, index: any) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '400px',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('result - ', result)
        const index = this.getResponse.findIndex((item: { id: any; }) => item.id === result.id);
        console.log('index - ', result)
        if (index >= 0 && index < this.getResponse.length) {
          this.getResponse = [
            ...this.getResponse.slice(0, index),
            result,
            ...this.getResponse.slice(index + 1)
          ];
        }
      }
    });
  }

  deleteRow(data: any, index: any) {
    console.log('data in the table - ', data);
    this.apiService.deleteData(data).subscribe(
      (response) => {
        if (index >= 0 && index < this.getResponse.length) {
          this.getResponse.splice(index, 1); 
          console.log('deleting get response - ', this.getResponse)
          this.getResponse = [...this.getResponse]; 
        }
        console.log('delete response - ', response);
      },
      (error) => {
        console.error('error in delete - ', error);
      }
    );
  }
}
