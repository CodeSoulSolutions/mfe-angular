import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../components/header/header.component";
import { UserStateService } from '../services/user-statemanagement.service';


@Component({
  selector: 'app-user-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule
],
  providers: [UserStateService],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  userForm: FormGroup;
  user: string = 'Player X';
  userDetails: any = null;
  user_x: any = null;
  user_o: any = null
  difficulties = ['Easy', 'hard', 'medium']
  genders = ['male', 'female']
  isEdit: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private userState: UserStateService, private route: ActivatedRoute) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      difficulty: ['', Validators.required],
      gender: ['', Validators.required],
      playerDescription: ['']
    });

    this.userDetails = this.userState.getUserDetails();
    console.log('userform component - ', this.userDetails);
    this.user_x = this.userDetails.user_x;
    this.user_o = this.userDetails.user_o;
  }

  ngOnInit(): void {
    console.log('user-information')
    this.route.paramMap.subscribe(params => {
      const param = params.get('player');
      console.log(param);
      console.log(param?.split('-'));
      if (param != null) {
        this.isEdit = param?.split('-').length > 1 ? true : false
        const player = param?.split('-')[0]
        this.user = player === 'X' ? 'Player X' : 'Player O';
        const userPrefilledDetails = this.user === 'Player X' ? this.userState.getUserDetails().user_x : this.userState.getUserDetails().user_o
        this.userForm = this.fb.group({
          firstName: [userPrefilledDetails.firstName, Validators.required],
          lastName: [userPrefilledDetails.lastName, Validators.required],
          dateOfBirth: [userPrefilledDetails.dateOfBirth, Validators.required],
          phoneNumber: [userPrefilledDetails.phoneNumber, [Validators.required]],
          email: [userPrefilledDetails.email, [Validators.required, Validators.email]],
          difficulty: [userPrefilledDetails.difficulty, Validators.required],
          gender: [userPrefilledDetails.gender, Validators.required],
          playerDescription: [userPrefilledDetails.playerDescription]
        });
      }
      console.log('user - ', this.user);
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Data:', this.userForm.value);

      if (this.user === 'Player X') {
        this.user_x = this.userForm.value;
        this.userState.setUserX(this.user_x)
        this.user = 'Player O';
        // this.userForm.reset();
        // Object.keys(this.userForm.controls).forEach((key) => {
        //   const control = this.userForm.get(key);
        //   control?.setErrors(null); // Clears validation errors
        //   control?.markAsPristine(); // Marks the control as pristine
        //   control?.markAsUntouched(); // Marks the control as untouched
        // });
        this.isEdit ? this.router.navigate(['/tictactoe/tic-tac-toe']) : this.router.navigate([`/tictactoe/user-information/O`]);
      } else {
        this.user_o = this.userForm.value;
        this.userState.setUserO(this.user_o)
        this.router.navigate(['/tictactoe/tic-tac-toe']);
      }

      console.log(`User State service:`, this.userState.getUserDetails());
    } else {
      console.error('Form is invalid');
    }
  }
}