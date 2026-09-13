import {
  Component,
  ElementRef,
  OnDestroy,
  AfterViewInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import {
  ShaderMount,
  ShaderFitOptions,
  getShaderColorFromString,
  heatmapFragmentShader,
  toProcessedHeatmap,
} from '@paper-design/shaders';

@Component({
  selector: 'app-paper-background',
  templateUrl: './paper-background.html',
  styleUrl: './paper-background.css',
})
export class PaperBackground implements AfterViewInit, OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);

  private shader: ShaderMount | null = null;
  private processedImageUrl: string | null = null;

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const container = this.elementRef.nativeElement.querySelector(
      '.shader-container',
    ) as HTMLElement | null;

    if (!container) {
      return;
    }

    const sourceImage =
      '/exp.svg'; 

    try {
      const processed = await toProcessedHeatmap(sourceImage);

      this.processedImageUrl = URL.createObjectURL(processed.blob);

      const image = new Image();

      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () =>
          reject(new Error('Failed to load processed shader image.'));
        image.src = this.processedImageUrl!;
      });

      this.shader = new ShaderMount(
        container,
        heatmapFragmentShader,
        {
          u_image: image,

          u_contour: 0.5,
          u_angle: 0,
          u_noise: 0,
          u_innerGlow: 0.5,
          u_outerGlow: 0.5,

          u_colorBack: getShaderColorFromString('#08090D'),

          u_colors: [
            '#112069',
            '#1f3ca3',
            '#3265e7',
            '#6bd8ff',
            '#ffe77a',
            '#ff9a1f',
            '#ff4d00',
          ].map(getShaderColorFromString),

          u_colorsCount: 7,

          u_fit: ShaderFitOptions.cover,
          u_scale: 0.55,
          u_rotation: 0,

          u_offsetX: 0,
          u_offsetY: 0,

          u_originX: 0.5,
          u_originY: 0.5,

          u_worldWidth: 0,
          u_worldHeight: 0,
        },
        undefined,
        1,
        0,
        1,
        1920 * 1080 * 2,
        ['u_image'],
      );
    } catch (error) {
      console.error('Paper shader initialization failed:', error);
    }
  }

  ngOnDestroy(): void {
    this.shader?.dispose();

    if (this.processedImageUrl) {
      URL.revokeObjectURL(this.processedImageUrl);
    }
  }
}