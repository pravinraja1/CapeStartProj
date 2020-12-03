import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryBooksComponent } from './library.component';

describe('LibraryComponent', () => {
  let component: LibraryBooksComponent;
  let fixture: ComponentFixture<LibraryBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryBooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
