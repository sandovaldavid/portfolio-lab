import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarLedgerComponent as StarLedger } from './star-ledger.component';

describe('StarLedger', () => {
	let component: StarLedger;
	let fixture: ComponentFixture<StarLedger>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [StarLedger],
		}).compileComponents();

		fixture = TestBed.createComponent(StarLedger);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render all achievement entries by default', () => {
		const rows = fixture.nativeElement.querySelectorAll('.entry-row');
		expect(rows.length).toBe(component.entries().length);
	});

	it('should expand a row when clicked', () => {
		const firstButton = fixture.nativeElement.querySelector('.row-summary');
		firstButton.click();
		fixture.detectChanges();

		expect(component.expandedId()).toBe(component.entries()[0].id);
		expect(fixture.nativeElement.querySelector('.row-detail')).toBeTruthy();
	});

	it('should collapse an expanded row when clicked again', () => {
		const firstButton = fixture.nativeElement.querySelector('.row-summary');
		firstButton.click();
		fixture.detectChanges();
		firstButton.click();
		fixture.detectChanges();

		expect(component.expandedId()).toBeNull();
	});

	it('should filter entries by category', () => {
		const memoryFilter = component.filters.find((f) => f.key === 'memory');
		expect(memoryFilter).toBeDefined();

		component.activeFilter.set('memory');
		fixture.detectChanges();

		expect(component.entries().every((e) => e.category === 'memory')).toBe(true);
	});

	it('should render prominent header with metric cards when prominent input is true', () => {
		fixture.componentRef.setInput('prominent', true);
		fixture.detectChanges();

		const prominentHeader = fixture.nativeElement.querySelector('.prominent-header');
		expect(prominentHeader).toBeTruthy();

		const metricCards = fixture.nativeElement.querySelectorAll('.metric-card');
		expect(metricCards.length).toBe(component.metricCards().length);
	});

	it('should not render prominent header when prominent input is false', () => {
		fixture.componentRef.setInput('prominent', false);
		fixture.detectChanges();

		expect(fixture.nativeElement.querySelector('.prominent-header')).toBeFalsy();
	});
});
