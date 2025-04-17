import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumPackComponent } from './album-pack.component';

describe('AlbumPackComponent', () => {
  let component: AlbumPackComponent;
  let fixture: ComponentFixture<AlbumPackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumPackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
