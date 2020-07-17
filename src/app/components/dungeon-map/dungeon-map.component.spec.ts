import { DungeonMapComponent } from './dungeon-map.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('DungeonMapComponent', () => {
  let component: DungeonMapComponent;
  let fixture: ComponentFixture<DungeonMapComponent>;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
        declarations: [DungeonMapComponent],
        imports: [
          TranslateModule.forRoot()
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DungeonMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
