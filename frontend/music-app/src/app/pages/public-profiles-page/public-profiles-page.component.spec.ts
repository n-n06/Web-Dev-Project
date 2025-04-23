import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProfilesPageComponent } from './public-profiles-page.component';

describe('PublicProfilesPageComponent', () => {
  let component: PublicProfilesPageComponent;
  let fixture: ComponentFixture<PublicProfilesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicProfilesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicProfilesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
