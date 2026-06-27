import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import AboutPage from './about.page';

describe('AboutPage', () => {
	let component: AboutPage;
	let fixture: ComponentFixture<AboutPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AboutPage, RouterTestingModule],
			providers: [provideHttpClientTesting()],
		}).compileComponents();

		fixture = TestBed.createComponent(AboutPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
