import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAddEditComponent } from './employee-add-edit.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter} from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';


describe('EmployeeAddEditComponent', () => {
  let component: EmployeeAddEditComponent ;
  let fixture: ComponentFixture<EmployeeAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
       providers: [
       // provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([{ path: '**', component: EmployeeAddEditComponent }]),
        provideLocationMocks(),
      ],
      imports: [EmployeeAddEditComponent],
    
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeAddEditComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
