import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlqemamLogoComponent } from './alqemam-logo.component';

describe('AlqemamLogoComponent', () => {
  let component: AlqemamLogoComponent;
  let fixture: ComponentFixture<AlqemamLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlqemamLogoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlqemamLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
