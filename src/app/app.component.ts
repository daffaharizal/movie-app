import { Component } from '@angular/core';
import { MasterService } from './core/services/master.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Simpli DOTS!';
}
