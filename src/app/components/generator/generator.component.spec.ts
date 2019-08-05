import { GeneratorComponent } from './generator.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('GeneratorComponent', () => {
  let component: GeneratorComponent;
  let fixture: ComponentFixture<GeneratorComponent>;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
        declarations: [GeneratorComponent],
        imports: [
          TranslateModule.forRoot()
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
