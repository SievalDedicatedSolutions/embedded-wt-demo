import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-wt-page',
  templateUrl: './wt-page.component.html',
  styleUrls: ['./wt-page.component.scss']
})
export class WtPageComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  url: SafeResourceUrl;

  @ViewChild('frame')
  frame: ElementRef;

  ngOnInit() {
    let url = `${environment.apiBaseUrl}/?token=${this.auth.token}&isEmbedded=true`;
    const projectId = this.route.snapshot.queryParams.projectId;
    if (projectId) {
      url += `&projectId=${projectId}`;
    }

    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    fromEvent<MessageEvent>(window, 'message')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(message => {
        if (!this.frame) {
          return;
        }
        const frame: HTMLIFrameElement = this.frame.nativeElement;

        if (message.source === frame.contentWindow) {
          const data = message.data;
          const queryParams = {};
          switch (data.type) {
            case 'CLOSE_PROJECT':
            case 'SAVE_PROJECT':
              if (data.payload) {
                queryParams['projectId'] = data.payload;
              }
              break;
          }
          this.router.navigate(['/'], {
            queryParams
          });
        }
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
