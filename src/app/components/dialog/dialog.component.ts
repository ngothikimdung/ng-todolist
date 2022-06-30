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
  todoForm!: FormGroup;
  updateId!: any;
  isEditEnabled: boolean = false;

  constructor(private formb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: Todo,
    private dialogRef: MatDialogRef<DialogComponent>
    ) { }

  ngOnInit(): void {
    this.todoForm = this.formb.group({
      item: ['', Validators.required],
    });



  }



  updateTodo() {
    this.todos[this.updateId].name = this.todoForm.value.item;
    this.todos[this.updateId].isComplete = false;
    this.todoForm.reset();
    this.updateId = undefined;
    this.isEditEnabled = false;
  }

}
