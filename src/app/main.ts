import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './';
import './quill-delta-to-html/src/main.ts';


platformBrowserDynamic().bootstrapModule(AppModule);
