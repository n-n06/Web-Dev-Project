import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProfileDetailsPageComponent } from './public-profile-details-page.component';

describe('PublicProfileDetailsPageComponent', () => {
  let component: PublicProfileDetailsPageComponent;
  let fixture: ComponentFixture<PublicProfileDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicProfileDetailsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicProfileDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
