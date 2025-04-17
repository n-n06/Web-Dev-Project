import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumPackPageComponent } from './album-pack-page.component';

describe('AlbumPackPageComponent', () => {
  let component: AlbumPackPageComponent;
  let fixture: ComponentFixture<AlbumPackPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumPackPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumPackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
