import { WindowTitleComponent } from './window-title.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('WindowTitleComponent', () => {
  let component: WindowTitleComponent;
  let fixture: ComponentFixture < WindowTitleComponent > ;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
        declarations: [WindowTitleComponent],
        imports: [
          TranslateModule.forRoot()
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', async (() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('PAGES.HOME.TITLE');
  }));
});
