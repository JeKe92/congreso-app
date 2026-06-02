import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TronCardAccent = 'cyan' | 'orange' | 'purple' | 'green' | 'none';

@Component({
    selector: 'app-tron-card',
    imports: [CommonModule],
    templateUrl: './tron-card.component.html',
    styleUrl: './tron-card.component.scss'
})
export class TronCardComponent {
  @Input() accent: TronCardAccent = 'cyan';
  @Input() hoverable = true;
  @Input() padding: 'sm' | 'md' | 'lg' = 'md';
}
