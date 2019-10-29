import { Component, ViewChild } from '@angular/core';
import { extend, closest } from '@syncfusion/ej2-base';
import { EventSettingsModel, View, DayService, WeekService, WorkWeekService, MonthService, DragAndDropService, ResizeService, ScheduleComponent, CellClickEventArgs } from '@syncfusion/ej2-angular-schedule';
import { GridComponent, RowDDService, EditService, EditSettingsModel, RowDropSettingsModel } from '@syncfusion/ej2-angular-grids';
import { hospitalData, waitingList } from './data';

@Component({
  selector: 'app-root',
  template: `<div>
  <h1>Drag a record from <span style="color:red">Grid</span> and drop it into <span style="color:red">Scheduler</span></h1>
  <div style="float:left">
  <h2>A doctor's Calendar</h2>
  <ejs-schedule id='Schedule' #scheduleObj width='800px' height='650px' 
    [currentView]="currentView" 
    [selectedDate]="selectedDate" 
    [eventSettings]="eventSettings">
  </ejs-schedule>
  </div>
  
  <div style="width:400px;float:right;margin-right:350px">
  <h2>Waiting list</h2>
   <ejs-grid id='Grid' #gridObj 
        [dataSource]='gridDS' width="300px" 
        [allowSelection]="true" 
        [allowRowDragAndDrop]="true" 
        [editSettings]='editSettings'
        [rowDropSettings]="srcDropOptions" 
        (rowDrop)="onDragStop($event)" 
        (rowDrag)="onRowDrag($event)">
      <e-columns>
        <e-column field='Id' isPrimaryKey='primaryKeyVal' headerText='ID' width='30' textAlign='Right'></e-column>
        <e-column field='Name' headerText='Name' width='40'></e-column>
        <e-column field='Description' headerText='Reason' width='50'></e-column>
      </e-columns>
   </ejs-grid>
  </div></div>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'drag-resize-actions';
  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;
  @ViewChild('gridObj')
  public gridObj: GridComponent;

// Scheduler data
  public data: Object[] = <Object[]>extend([], hospitalData, null, true);
  public selectedDate: Date = new Date(2018, 7, 1);
  public currentView: View = 'Week';
  public eventSettings: EventSettingsModel = {
     dataSource: this.data,
     fields: {
         subject: { title: 'Patient Name', name: 'Name' },
         startTime: { title: 'From', name: 'StartTime' },
         endTime: { title: 'To', name: 'EndTime' },
         description: { title: 'Reason', name: 'Description' }
     }
  };

// Grid data
  public gridDS: Object = waitingList;
  public allowDragAndDrop: boolean = true;
  public srcDropOptions: RowDropSettingsModel = { targetID: 'Schedule' };
  public primaryKeyVal: boolean = true;
  public editSettings: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true
  };

  onRowDrag(event: any): void { 
    event.cancel = true;
  }

  onDragStop(event: any): void { 
    event.cancel = true;
    let scheduleElement: Element = <Element>closest(event.target, '.e-content-wrap');
    if (scheduleElement) {
       if (event.target.classList.contains('e-work-cells')) {
          const filteredData: Object = event.data;
          let cellData: CellClickEventArgs = this.scheduleObj.getCellDetails(event.target);
          let eventData: { [key: string]: Object } = {
                Name: filteredData[0].Name,
                StartTime: cellData.startTime,
                EndTime: cellData.endTime,
                IsAllDay: cellData.isAllDay,
                Description: filteredData[0].Description
           };
           this.scheduleObj.addEvent(eventData);
          // this.scheduleObj.openEditor(eventData, 'Add', true);
           this.gridObj.deleteRecord(event.data[0]); 
         }
     }
  }
}
