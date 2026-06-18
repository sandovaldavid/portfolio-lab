---
description: Scaffold a new FSD feature with component, spec, and E2E test
---

Create a new Feature-Sliced Design (FSD) component in the correct layer.

The user will specify: layer (shared/entities/features/widgets), name, and optionally a scope/description.

If not specified, ask for:
1. Which FSD layer: shared | entities | features | widgets
2. Component name (kebab-case, e.g. `user-card`)
3. What it does (brief description for context)

## Steps to follow

1. Determine the target path: `src/app/<layer>/<name>/`

2. Create `<name>.component.ts` following this pattern:
```typescript
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-<name>',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <!-- template -->
    </div>
  `,
})
export class <PascalName>Component {
  // inputs and outputs here
}
```

3. Create `<name>.component.spec.ts`:
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { <PascalName>Component } from './<name>.component';

describe('<PascalName>Component', () => {
  let fixture: ComponentFixture<<PascalName>Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [<PascalName>Component],
    }).compileComponents();
    fixture = TestBed.createComponent(<PascalName>Component);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });
});
```

4. If it is a widget or feature with user-facing interactions, add a test case to `e2e/navigation.spec.ts` or create `e2e/<name>.spec.ts`.

5. Export from the layer's index if one exists (`index.ts`).

6. Run `pnpm lint` and `pnpm test -- --run` to verify everything passes.

7. Report what was created and what tests need to be expanded.

## FSD rules to enforce

- `shared` components must have zero dependency on other layers
- `entities` can import from `shared` only
- `features` can import from `entities` and `shared`
- `widgets` can import from `features`, `entities`, and `shared`
- `pages` can import from all layers

Use `@shared/*`, `@entities/*`, `@features/*`, `@widgets/*` path aliases.
