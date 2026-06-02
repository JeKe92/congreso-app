import { Component, Input } from '@angular/core';


export type TronCardAccent = 'cyan' | 'orange' | 'purple' | 'green' | 'none';

@Component({
    selector: 'app-tron-card',
    imports: [],
    templateUrl: './tron-card.component.html',
    styleUrl: './tron-card.component.scss'
})
export class TronCardComponent {
  @Input() accent: TronCardAccent = 'cyan';
  @Input() hoverable = true;
  @Input() padding: 'sm' | 'md' | 'lg' = 'md';
}
