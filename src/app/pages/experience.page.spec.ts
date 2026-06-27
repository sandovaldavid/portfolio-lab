import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import ExperiencePage from './experience.page';

describe('ExperiencePage', () => {
	let component: ExperiencePage;
	let fixture: ComponentFixture<ExperiencePage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ExperiencePage, RouterTestingModule],
			providers: [provideHttpClientTesting()],
		}).compileComponents();

		fixture = TestBed.createComponent(ExperiencePage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
