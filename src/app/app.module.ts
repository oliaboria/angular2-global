import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { NgModule, ApplicationRef } from '@angular/core';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';

// Components
import { HeaderModule, FooterModule } from './common/components';
import { LoaderBlockComponent } from './common/components/loader-block';

// Pages
import { CoursesModule } from './pages/courses';
import { CourseDetailsModule } from './pages/course-details';
import { LoginModule } from './pages/login';
import { NotFoundModule } from './pages/not-found';

// Services
import { AuthService } from './common/services';
import { BreadcrumbService } from './common/services';
import { CoursesService } from './common/services';
import { LoaderBlockService } from './common/components/loader-block';
import { HttpClient } from './common/services';

// Application wide providers
const APP_PROVIDERS = [
	AuthService,
	BreadcrumbService,
	CoursesService,
	LoaderBlockService,
	{
      provide: HttpClient,
      useFactory: (backend: XHRBackend, options: RequestOptions) => {
        return new HttpClient(backend, options);
      },
      deps: [XHRBackend, RequestOptions]
    }
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
	bootstrap: [AppComponent],
	declarations: [
		AppComponent,
		LoaderBlockComponent
	],
	imports: [ // import Angular's modules
		BrowserModule,
		FormsModule,
		HttpModule,
		BrowserAnimationsModule,
		MaterialModule.forRoot(),
		RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules}),
		HeaderModule,
		FooterModule,
		CoursesModule,
		CourseDetailsModule,
		LoginModule,
		NotFoundModule
	],
	providers: [ // expose our Services and Providers into Angular's dependency injection
		ENV_PROVIDERS,
		APP_PROVIDERS
	]
})
export class AppModule {

	constructor(public appRef: ApplicationRef) {}

	public hmrOnInit(store: any) {
		if (!store || !store.state) { return; }
		this.appRef.tick();
		delete store.state;
	}

	public hmrOnDestroy(store: any) {
		const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
		// recreate elements
		store.disposeOldHosts = createNewHosts(cmpLocation);
		// remove styles
		removeNgStyles();
	}

	public hmrAfterDestroy(store: any) {
		// display new elements
		store.disposeOldHosts();
		delete store.disposeOldHosts;
	}

}
