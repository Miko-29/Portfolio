import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberCityComponent } from './cyber-city.component';

describe('CyberCityComponent', () => {
  let component: CyberCityComponent;
  let fixture: ComponentFixture<CyberCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CyberCityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CyberCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
