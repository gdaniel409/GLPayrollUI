import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListComponent } from './employee-list.component';
import { provideRouter} from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';


describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EmployeeListComponent,
      ],
     providers: [
             provideRouter([{ path: '**', component: EmployeeListComponent }]),
             provideLocationMocks(),
             provideHttpClientTesting(),
          
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    
  });
});
