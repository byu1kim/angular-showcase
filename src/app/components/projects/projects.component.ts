import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
import { Category } from '../../models/category';
import { Tag } from '../../models/tag';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) {}

  projects: Project[] = [];
  getProjects(): void {
    this.projectService
      .getProjects()
      .subscribe((projects) => (this.projects = projects));
  }

  getProjectsByCategory(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.projectService
      .getProjectsByCategory(id)
      .subscribe((projects) => (this.projects = projects));
  }

  getProjectsByTag(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.projectService
      .getProjectsByTag(id)
      .subscribe((projects) => (this.projects = projects));
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.paramSlug = params['id'];
      console.log(this.paramSlug);
      const segment: string = this.route.snapshot.url[1]?.path;
      if (segment === 'categories') {
        this.getProjectsByCategory();
      } else if (segment === 'tags') {
        this.getProjectsByTag();
      } else {
        this.getProjects();
      }
    });
  }

  @Input() paramSlug: String | undefined;
  @Input() categoryFilter: Category | undefined;
  @Output() newCategoryFilterEvent = new EventEmitter<Category>();
  @Input() tagFilter: Tag | undefined;
  @Output() newTagFilterEvent = new EventEmitter<Tag>();

  title = 'Projects';
  setCategoryFilter(category: Category) {
    this.categoryFilter = category;
    this.newCategoryFilterEvent.emit(category);
  }

  setTagFilter(tag: Tag) {
    this.tagFilter = tag;
    this.newTagFilterEvent.emit(tag);
  }

  clearFilters() {
    this.categoryFilter = undefined;
    this.tagFilter = undefined;
  }
  //
  selectedProject?: Project;
  onSelect(project: Project): void {
    this.selectedProject = project;
  }
  clearSelectedProject(): void {
    this.selectedProject = undefined;
  }
}
