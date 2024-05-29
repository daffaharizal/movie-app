import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {
  @Input({ required: true }) namePreviousPage!: string;
  @Input({ required: true }) nameCurrentPage!: string;

  private router = inject(Router);
  
  previousPage() {
    this.router.navigate(['/']);
  }
}
