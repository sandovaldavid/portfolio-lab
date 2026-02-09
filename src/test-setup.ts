/// <reference types="vitest/globals" />

import '@angular/compiler';
import '@analogjs/vitest-angular/setup-snapshots';
import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';
import { ngMocks } from 'ng-mocks';
import { vi } from 'vitest';

// Configure ng-mocks with vitest spy
ngMocks.autoSpy(() => vi.fn());

setupTestBed();
