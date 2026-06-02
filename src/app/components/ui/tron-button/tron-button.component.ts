import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

export type TronButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type TronButtonSize = 'sm' | 'md' | 'lg';

@Component({
    selector: 'app-tron-button',
    imports: [],
    templateUrl: './tron-button.component.html',
    styleUrl: './tron-button.component.scss'
})
export class TronButtonComponent {
  private readonly router = inject(Router);

  @Input() variant: TronButtonVariant = 'primary';
  @Input() size: TronButtonSize = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() routerLink: string | null = null;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() fullWidth = false;

  handleClick(): void {
    if (this.routerLink) {
      this.router.navigateByUrl(this.routerLink);
    }
  }
}
