import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from 'src/app/todos';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  todos: Todo[] = [];
  dialogForm!: FormGroup;
  updateId!: any;
  isEditEnabled: boolean = false;

  constructor(private formb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: Todo,
    private dialogRef: MatDialogRef<DialogComponent>
    ) { }

  ngOnInit(): void {
    this.dialogForm = this.formb.group({
      item: ['', Validators.required],
    });



  }

  // onEdit(item: Todo, idx: number) {
  //   // this.dialog.open(DialogComponent)
  //   this.dialogForm.controls['item'].setValue(item.name);
  //   this.updateId = idx;
  //   this.isEditEnabled = true;
  // }



  updateTodo() {
    this.todos[this.updateId].name = this.dialogForm.value.item;
    this.todos[this.updateId].isComplete = false;
    this.dialogForm.reset();
    this.updateId = undefined;
    this.isEditEnabled = false;
  }

}
