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
});
