import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { Page } from '../common/page';
import { UserService } from '../services/shared/user.service';
import { ProjectService } from '../services/shared/project.service';
import { ConfirmationComponent } from '../shared/confirmation/confirmation.component';





@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  modalRef: BsModalRef;
  projectForm: FormGroup;

  @ViewChild('tplProjectDeleteCell', { static: true }) tplProjectDeleteCell: TemplateRef<any>;

  page = new Page();
  cols = [];
  rows = [];
  managerOptions = [];


  constructor(
    private projectService: ProjectService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit(): void {
    
    this.cols = [
      { prop: 'id', name: 'No' },
      { prop: 'projectName', name: 'Project Name', sortable: false },
      { prop: 'projectCode', name: 'Project Code', sortable: false },
      { prop: 'manager.nameSurname', name: 'Manager', sortable: false },
      {
        prop: 'id', name: 'Actions',
        cellTemplate: this.tplProjectDeleteCell,
        flexGrow: 1,
        sortable: false
      },
      
    ];

    this.setPage({ offset: 0 });

    this.projectForm = this.formBuilder.group({
      'projectCode': [null, [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      'projectName': [null, [Validators.required, Validators.minLength(4)]],
      'managerId': [null, [Validators.required]]

    });

    this.userService.getAll().subscribe(res => {
      this.managerOptions = res;

      console.log(res);

    })
  }

  
  get f() { return this.projectForm.controls }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  saveProject() {
    if (!this.projectForm.valid)
      return;

    this.projectService.createProject(this.projectForm.value).subscribe(
      response => {
        this.setPage({ offset: 0 });
        this.closeAndResetModal();
      })

  }

  closeAndResetModal() {
    this.projectForm.reset();
    this.modalRef.hide();
  }


  setPage(pageInfo) {
    this.page.page = pageInfo.offset;
    this.projectService.getAllPageable(this.page).subscribe(pagedData => {
      this.page.size = pagedData.size;
      this.page.page = pagedData.page;
      this.page.totalElements = pagedData.totalElements;
      this.rows = pagedData.content;
    })
  }

  showProjectDeleteConfirmation(value): void {
    const modal = this.modalService.show(ConfirmationComponent);
    (<ConfirmationComponent>modal.content).showConfirmation(
      'Delete Confirmation',
      'Are u sure for delete Project'
    );

    (<ConfirmationComponent>modal.content).onClose.subscribe(result => {
      if (result === true) {
        this.projectService.delete(value).subscribe(response => {
          if (response == true) {
            this.setPage({ offset: 0 })

          }

        });
      } else if (result === false) {

      }
    }
    );
  }

}
