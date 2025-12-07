import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageToData } from './image-to-data';

describe('ImageToData', () => {
  let component: ImageToData;
  let fixture: ComponentFixture<ImageToData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageToData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageToData);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
