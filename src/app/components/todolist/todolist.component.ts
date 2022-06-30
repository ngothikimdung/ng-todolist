import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/app/todos';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
})
export class TodolistComponent implements OnInit {
  todoForm!: FormGroup;
  todos: Todo[] = [];
  complete: Todo[] = [];
  inprogress: Todo[] = [];
  updateId!: any;
  isEditEnabled: boolean = false;


  constructor(private formb: FormBuilder, private dialog: MatDialog) {}


  // openDialog() {
  //   this.dialog.open(DialogComponent, {
  //   });
  // }

  ngOnInit(): void {
    this.todoForm = this.formb.group({
      item: ['', Validators.required],
    });
  }

  addTodo() {
    this.todos.push({
      name: this.todoForm.value.item,
      isComplete: false,
    });
    this.todoForm.reset();
  }

  onEdit(item: Todo, idx: number) {
    this.dialog.open(DialogComponent)
    // this.todoForm.controls['item'].setValue(item.name);
    // this.updateId = idx;
    // this.isEditEnabled = true;
  }



  removeTodo(idx: number) {
    this.todos.splice(idx, 1);
  }

  removeInprogress(idx: number) {
    this.inprogress.splice(idx, 1);
  }

  removeComplete(idx: number) {
    this.complete.splice(idx, 1);
  }

  drop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}



