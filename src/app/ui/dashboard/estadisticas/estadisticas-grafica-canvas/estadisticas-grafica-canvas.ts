import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';

@Component({
  selector: 'app-estadisticas-grafica-canvas',
  imports: [CommonModule],
  templateUrl: './estadisticas-grafica-canvas.html',
  styleUrl: './estadisticas-grafica-canvas.scss',
})
export class EstadisticasGraficaCanvas implements AfterViewInit {

  chartCanvas = viewChild<ElementRef<HTMLCanvasElement>>('chartCanvas');

  aptos = input.required<number>();
  noAptos = input.required<number>();

  ngAfterViewInit() {
    this.drawChart();
  }

  private drawChart() {
    const canvas = this.chartCanvas()?.nativeElement;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    let aptosAngle = 0;
    let noAptosAngle = 0;
    let colorApto = '';
    let colorNoApto = '';
    
    const radius = Math.min(50, 50);
    const total = this.aptos() + this.noAptos();

    if (total > 0) {
      aptosAngle = (this.aptos() / total) * 2 * Math.PI;
      noAptosAngle = (this.noAptos() / total) * 2 * Math.PI;
      colorApto = '#00B50C';
      colorNoApto = '#FF0000';
    } else {
      aptosAngle = 180;
      noAptosAngle = 180;
      colorApto = '#c4ffc8';
      colorNoApto = '#ff9393';
    }


    // Sector aptos (verde)
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.fillStyle = colorApto;
    ctx.arc(50, 50, radius, 0, aptosAngle);
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Sector no aptos (rojo)
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.fillStyle = colorNoApto;
    ctx.arc(50, 50, radius, aptosAngle, aptosAngle + noAptosAngle);
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}
