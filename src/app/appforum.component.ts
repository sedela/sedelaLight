import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Comments } from './model/user.model';


/*export class PostForums {
  comment_author: string;
  date_posted: any;
  content_content: string;
}*/

@Component({
  selector: 'app-forum',
  templateUrl: './appforum.component.html',
  styleUrls: ['./appforum.component.css']
  //providers: [PostForums]
  // templateUrl: './appforum.component.html',
  // styleUrls: ['./appforum.component.css']
})

// tslint:disable-next-line:component-class-suffix

export class AppForumComponent {


  panelOpenState: boolean = false;
  @Input() author: string = '';

  @Output() postChange = new EventEmitter<Comments>();
  postsforum: Comments;
  @Input() listOfPost: any[];
  
  forumForm = new FormGroup({
    //contactFormModalSubject: new FormControl('', Validators.required),
    contactFormModalMessage: new FormControl('', Validators.required)
  });



  addPost() {
    //console.log('contactFormModalSubject: ', this.forumForm.get('contactFormModalSubject').value );
    //console.log(' contactFormModalMessage: ', this.forumForm.get('contactFormModalMessage').value);
    //this.postsforum.post_id = this.forumForm.get('contactFormModalSubject').value;
    if (this.forumForm.get('contactFormModalMessage').value) {
      this.postsforum = new Comments();
      this.postsforum.comment_author = this.author;
      this.postsforum.comment_content = this.forumForm.get('contactFormModalMessage').value;
      this.postsforum.date_posted = new Date();
      this.postChange.emit(this.postsforum);
      this.forumForm.reset();
    }

  }

}
