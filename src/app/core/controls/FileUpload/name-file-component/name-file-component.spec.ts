import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameFileComponent } from './name-file-component';
import { provideHttpClientTesting } from '@angular/common/http/testing';


describe('NameFileComponent', () => {
  let component: NameFileComponent;
  let fixture: ComponentFixture<NameFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
       // provideHttpClient(),
        provideHttpClientTesting() 
      ],
      imports: [NameFileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NameFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
