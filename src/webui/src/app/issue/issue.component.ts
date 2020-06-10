import { Component, OnInit, TemplateRef } from '@angular/core';
import { IssueService } from '../services/shared/issue.service';
import { Page } from '../common/page';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ProjectService } from '../services/shared/project.service';


@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
  modalRef: BsModalRef;
  pageissue = new Page();
  issuerows = [];
  projectOptions = [];
  issueForm: FormGroup;


  constructor(
    private issueService: IssueService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private projectService: ProjectService,

  ) { }

  ngOnInit(): void {
    this.issueForm = this.formBuilder.group({

      projectId: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });

    this.loadProjects();

    this.setPageissue({ offset: 0 });


  }


  private loadProjects() {
    this.projectService.getAll().subscribe(response => {
      this.projectOptions = response;
    })
  }


  setPageissue(pageInfoisue) {
    this.pageissue.page = pageInfoisue.offset;
    this.issueService.getAll(this.pageissue).subscribe(pagedData => {
      this.pageissue.size = pagedData.size;
      this.pageissue.page = pagedData.page;
      this.pageissue.totalElements = pagedData.totalElements;
      this.issuerows = pagedData.content;
    })
  }

  get f() { return this.issueForm.controls }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  saveIssue() {
    this.issueService.createIssue(this.issueForm.value).subscribe(
      resp => {
        this.issueForm.reset();
        this.setPageissue({ offset: 0 });
        this.closeAndResetModal();

      }
    );
  }

  closeAndResetModal(){
    
    this.modalRef.hide();
  }


}
