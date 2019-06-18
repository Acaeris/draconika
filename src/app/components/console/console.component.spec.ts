import { ConsoleComponent } from './console.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('HomeComponent', () => {
  let component: ConsoleComponent;
  let fixture: ComponentFixture < ConsoleComponent > ;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
        declarations: [ConsoleComponent],
        imports: [
          TranslateModule.forRoot()
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
