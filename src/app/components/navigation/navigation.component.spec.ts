import { NavigationComponent } from './navigation.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [
        TranslateModule.forRoot()
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
