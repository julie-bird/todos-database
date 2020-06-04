import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from '../interfaces/todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  showIndex: number = null;

  constructor(private service: TodoService) { }


  ngOnInit(): void {
    this.getAllItems();
  };
  getAllItems() {
    this.service.getAllItems().subscribe((response) => {
      this.todos = response;
      console.log(this.todos)
    })
  }
  addItem(form: NgForm): void {
    form.value.completed = false;
    this.service.addItem(form.value).subscribe(() => {
      this.getAllItems();
      form.reset();
    });
  }
  deleteItem(id: number): void {
    this.service.deleteItem(id).subscribe(() => {
      this.getAllItems();
    });
  }
  // updateItem(form: NgForm, item: Todo): void {
  //   let updatedTodo = item;
  //   updatedTodo.task = form.value.task;
  //   this.service.updateItem(item.id, updatedTodo).subscribe(() => {
  //     this.getAllItems();
  //   });
  //   this.showIndex = null;
  // }
  showForm(index: number): void {
    this.showIndex = index;
  }

  complete(index: number): void {
    this.todos[index].completed = true
  };
}
