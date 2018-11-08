import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { WtService } from 'src/app/services/wt.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private wt: WtService
  ) {}

  model = {
    domainName: '',
    username: '',
    password: ''
  };

  isLoading = false;

  project: any;

  get token() {
    return this.auth.token;
  }

  async ngOnInit() {
    const projectId = this.route.snapshot.queryParams.projectId;
    if (projectId) {
      this.isLoading = true;
      const id = parseInt(projectId, 10);
      try {
        this.project = await this.wt.loadProject(id).toPromise();
      } finally {
        this.isLoading = false;
      }
    }
  }

  async onLogin() {
    this.isLoading = true;
    try {
      await this.auth.login(this.model);
      this.router.navigate(['wt']);
    } finally {
      this.isLoading = false;
    }
  }

  onEdit() {
    this.router.navigate(['wt'], { queryParams: { projectId: this.project.id } });
  }
}
