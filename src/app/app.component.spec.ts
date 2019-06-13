import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ElectronService } from './providers/electron.service';
import { TranslateModule } from '@ngx-translate/core';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            providers: [
                ElectronService
            ],
            imports: [
                RouterTestingModule,
                TranslateModule.forRoot()
            ]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
});

class TranslateServiceStub {
    setDefaultLang(lang: string): void {
    }
}
