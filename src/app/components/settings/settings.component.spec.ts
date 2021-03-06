import { SettingsComponent } from './settings.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture < SettingsComponent > ;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
        declarations: [SettingsComponent],
        imports: [
          TranslateModule.forRoot()
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
