import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  currentDir = 'ltr'; // כיוון ברירת מחדל

  constructor(private analytics: AnalyticsService, private seoService: SeoService, private translate: TranslateService) {
    this.translate.setDefaultLang('en'); // שפת ברירת מחדל
    this.translate.onLangChange.subscribe(event => {
      this.currentDir = event.lang === 'he' ? 'rtl' : 'ltr';
      document.documentElement.setAttribute('dir', this.currentDir);
    });
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }

  switchLanguage(language: string): void {
    this.translate.use(language);
  }
}
