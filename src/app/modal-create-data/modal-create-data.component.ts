import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

export interface Data{
  entryDate: Data;
  exitDate: Data;
  entryPrice: number;
  exitPrice: number;
}

@Component({
  selector: 'app-modal-create-data',
  templateUrl: './modal-create-data.component.html',
  styleUrls: ['./modal-create-data.component.scss']
})
export class ModalCreateDataComponent implements OnInit {


  dataForm: FormGroup;
  entryDate = new FormControl('', Validators.required);
  exitDate = new FormControl('', Validators.required);
  entryPrice = new FormControl('', [Validators.required, Validators.min(0)]);
  exitPrice = new FormControl('', [Validators.required, Validators.min(0)]);

  constructor(
    private dialog: MatDialogRef<ModalCreateDataComponent>,
    private formBuilder: FormBuilder) {
    this.dataForm = this.formBuilder.group({
        entryDate: this.entryDate,
        exitDate: this.exitDate,
        entryPrice: this.entryPrice,
        exitPrice: this.exitPrice,
      }, {
        validators: this.getValidation('entryDate', 'exitDate')
      }
    );

  }

  ngOnInit(): void {
  }

  add(): void {
   const data: Data = this.dataForm.value;

   console.log(data);

   this.dialog.close();

  }

  getErrorMessages(control: FormControl | FormGroup): string {

    if (control.hasError('required')) {
      return 'This field cannot be empty';
    } else if (control.hasError('min')) {
      return 'Data cannot be  less than 0';
    } else if (control.hasError('dateError')) {
      return 'Enter date can not be less then End Date';
    }
  }

  public getValidation(entryDate, exitData): ValidatorFn {
    return (AC: AbstractControl) => {
      if (!AC) {
        return null;
      }
      const tempEntryDate = AC.get(entryDate);
      const tempExitData = AC.get(exitData);
      if (tempEntryDate.value > tempExitData.value) {
        return {dateError: true};
      }
      return null;
    };

  }
}

