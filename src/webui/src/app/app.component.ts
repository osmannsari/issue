import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Page } from './common/page';
import { ProjectService } from './services/shared/project.service';
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationComponent } from './shared/confirmation/confirmation.component';
import { UserService } from './services/shared/user.service';
import { IssueService } from './services/shared/issue.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title='webui';
}
