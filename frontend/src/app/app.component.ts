import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TodolistApp';


  totalTaskCount:number=0;
  pendingTaskCount:number=0;
  completedTaskCount:number=0;

  list:any[]=[];
  userEmail:any=null;
  constructor(private todo:TodoService,private router:Router) {
    this.getlist();
    //this.getAuth();
   }

  //  getAuth(){
  //   this.auth.isAuthenticated().subscribe((data)=>{
  //     if(data==null){
  //       this.router.navigate(['/signin'])
  //     }else{
  //         this.userEmail=data.email;
  //         this.getlist();
  //     }
  //   })
  // }

  getlist() {
    this.todo.getList()
    this.todo.list.subscribe(data=>{
      this.list=data;
      this.calculateCount(this.list);
    })
  }

  calculateCount(list: any[]) {
    this.totalTaskCount=0;
    this.pendingTaskCount=0;
    this.completedTaskCount=0;
    for(let i=0;i<list.length;i++){
      if(list[i].userEmail==this.userEmail){
        this.totalTaskCount++;
      }
      if(list[i].status=='completed'&&list[i].userEmail==this.userEmail){
        this.completedTaskCount=this.completedTaskCount+1;
      }
      if(list[i].status=='pending'&&list[i].userEmail==this.userEmail){
        this.pendingTaskCount=this.pendingTaskCount+1;
      }
    }
  }


}
