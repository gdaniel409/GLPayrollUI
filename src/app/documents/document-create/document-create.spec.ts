import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCreateComponent } from './document-create';
import { provideHttpClientTesting } from '@angular/common/http/testing';


describe('DocumentCreate', () => {
  let component: DocumentCreateComponent;
  let fixture: ComponentFixture<DocumentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
       providers: [
       // provideHttpClient(),
        provideHttpClientTesting() 
      ],
      imports: [DocumentCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
