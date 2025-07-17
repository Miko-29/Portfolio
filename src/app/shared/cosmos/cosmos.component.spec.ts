import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CosmosComponent } from './cosmos.component';

describe('CosmosComponent', () => {
  let component: CosmosComponent;
  let fixture: ComponentFixture<CosmosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CosmosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CosmosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
