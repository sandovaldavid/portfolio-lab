import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import SkillsPage from './skills.page';

describe('SkillsPage', () => {
	let component: SkillsPage;
	let fixture: ComponentFixture<SkillsPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SkillsPage, RouterTestingModule],
			providers: [provideHttpClientTesting()],
		}).compileComponents();

		fixture = TestBed.createComponent(SkillsPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
