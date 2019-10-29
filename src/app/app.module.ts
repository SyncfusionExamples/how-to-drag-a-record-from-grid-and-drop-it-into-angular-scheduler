import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScheduleModule, DayService, WeekService, WorkWeekService, MonthService, 
         DragAndDropService, ResizeService } from '@syncfusion/ej2-angular-schedule';
import { GridModule, RowDDService, EditService } from '@syncfusion/ej2-angular-grids';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ScheduleModule,
    GridModule
  ],
  providers: [ DayService, WeekService, WorkWeekService, MonthService, 
  DragAndDropService, ResizeService, RowDDService, EditService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
