import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-spinner-loading',
    imports: [
        MatProgressSpinnerModule
    ],
    templateUrl: './spinner-loading.html',
    styleUrl: './spinner-loading.scss'
})
export class SpinnerLoading { }
