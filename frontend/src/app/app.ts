import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  imports: [RouterModule, JsonPipe],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected title = 'frontend';
  protected readonly healthData = signal<Record<string, unknown> | null>(null);
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);

  async checkHealth(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    this.healthData.set(null);

    try {
      const res = await fetch('/api/health');
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      this.healthData.set(data?.data ?? data);
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      this.loading.set(false);
    }
  }
}
