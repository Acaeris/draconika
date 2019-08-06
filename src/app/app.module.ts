import 'reflect-metadata';
import '../polyfills';

import { NgModule } from '@angular/core';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { GeneratorModule } from './components/generator/generator.module';
import { HomeModule } from './components/home/home.module';

import { AppComponent } from './app.component';
import { WindowTitleComponent } from './components/window-title/window-title.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SharedModule } from './components/shared/shared.module';
import { NotepadComponent } from './components/notepad/notepad.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    WindowTitleComponent,
    NavigationComponent,
    NotepadComponent,
    WebviewDirective
  ],
  imports: [
    SharedModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    GeneratorModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [ HttpClient ]
      }
    })
  ],
  providers: [ ElectronService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
