import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsListComponent } from './documents-list';
import { provideRouter} from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';



describe('DocumentsList', () => {
  let component: DocumentsListComponent;
  let fixture: ComponentFixture<DocumentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentsListComponent],
      providers: [
              provideRouter([{ path: '**', component: DocumentsListComponent }]),
              provideLocationMocks(),
           
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
