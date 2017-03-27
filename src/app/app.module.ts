import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { NgModule, ApplicationRef } from '@angular/core';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { RouterModule, PreloadAllModules } from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';

// Components
import { HeaderModule, FooterModule } from './common/components';

// Pages
import { CoursesModule } from './pages/courses';
import { LoginModule } from './pages/login';

// Services
import { AuthService } from './common/services';
import { CoursesService } from './common/services';

// Application wide providers
const APP_PROVIDERS = [
	AuthService,
	CoursesService
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
	bootstrap: [AppComponent],
	declarations: [
		AppComponent
	],
	imports: [ // import Angular's modules
		BrowserModule,
		FormsModule,
		HttpModule,
		MaterialModule.forRoot(),
		RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules}),
		HeaderModule,
		FooterModule,
		CoursesModule,
		LoginModule
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
