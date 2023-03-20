import { Component, OnInit, HostListener } from '@angular/core';
import { Category } from './models/category';
import { Project } from './models/project';
import { Tag } from './models/tag';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'byul-showcase';
  tagFilter: Tag | undefined;
  public getScreenWidth: any;
  isMobile: any;

  setTagFilter(tag: Tag) {
    this.tagFilter = tag;
  }

  categoryFilter: Category | undefined;
  setCategoryFilter(category: Category) {
    this.categoryFilter = category;
  }

  clearFilters() {
    this.categoryFilter = undefined;
    this.tagFilter = undefined;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;

    if (this.getScreenWidth < 680) {
      this.isNavOpen = false;
      this.isMobile = true;
    } else {
      this.isNavOpen = true;
      this.isMobile = false;
    }
  }

  isNavOpen = false;
  toggleDisplayDivIf() {
    this.isNavOpen = !this.isNavOpen;
  }

  ngOnInit(): void {
    if (this.getScreenWidth < 680) {
      this.isNavOpen = false;
      this.isMobile = true;
    } else {
      this.isNavOpen = true;
      this.isMobile = false;
    }
  }
}
