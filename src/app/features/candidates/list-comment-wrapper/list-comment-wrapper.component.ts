import { Component, ViewChild } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
 import { GlobalService } from '../../../services/global.service';
import { ListCommentComponent } from '../../../shared/components/list-comment/list-comment.component';
 

@Component({
  selector: 'app-list-comment-wrapper',
  templateUrl: './list-comment-wrapper.component.html',
  styleUrls: ['./list-comment-wrapper.component.css']
})
export class ListCommentWrapperComponent {
  @ViewChild(ListCommentComponent) listComment!: ListCommentComponent;

  constructor(public dialog: DialogService, private gs: GlobalService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.gs.candidateId$.subscribe(candidateId => {
      this.listComment.candidateId = candidateId;
      this.listComment.getComments();
    });
  }

  // openAddComment() {
  //   const ref = this.dialog.open(AddCommentComponent, {
  //     data: {
  //       candidateId: this.listComment.candidateId
  //     },
  //     width: "30%",
  //     header: 'Add Comment',
  //   });

  //   ref.onClose.subscribe(response => {
  //     if (response == 'SUCCESS') {
  //       this.listComment.getComments();
  //     }
  //   });
  // }
}
