import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AGCSData, Event } from '../agcs-data';
import { MatDialog } from '@angular/material/dialog';
import { ImageViewComponent } from '../image-view/image-view.component';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'app-events-view',
  templateUrl: './events-view.component.html',
  styleUrls: ['./events-view.component.css']
})
export class EventsViewComponent implements OnInit {

  displayedColumns: string[] = ['time', 'Image_40_s',  'action'];
  //'Image_10_s_1', 'Image_10_s_2', 'Image_10_s_3', 'Image_10_s_4',
  
  dataSource = new MatTableDataSource<Event>();
  agcsData : AGCSData = null;
  potential: number = 0;
  awaiting: number = 0;
  confirmed: number = 0;
  

  constructor (
    private httpService: HttpClient,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    
    this.httpService.get('./assets/agcs_json_data.txt').subscribe(
      data => {
        this.agcsData = data as AGCSData;	
        //console.log(JSON.stringify(this.agcsData));
       
        this.dataSource = new MatTableDataSource<Event>(this.agcsData.Events);
        this._setCheckedStatus();
        this._updateMetrics();
        //console.log("ARRAY: "+JSON.stringify(this.dataSource));
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }
  private _setCheckedStatus() {
    this.agcsData.Events.forEach(e=>e.checked=false);
  }


  private _updateMetrics() {
    this.potential = this.agcsData.Events.length;
    this.awaiting = this.agcsData.Events.filter(e=>!e.checked).length;
    this.confirmed = this.agcsData.Events.filter(e=>e.value==='Yes').length;
  }

  processRow(row: Event, src:string){   
    row.checked = true;
    row.value = "Yes";
    //row.seizure = true;
    this.openImage(src);
  }

  openImage(src:string){
    const dialogRef = this.dialog.open(
                        ImageViewComponent, 
                        {data: { source: src }}
                      );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  onChange(value: MatButtonToggleChange, row:Event) {   
    if(value.value==='Yes'){
      row.value = "Yes";
      row.seizure = true;
      row.checked = true;
    }
    else if (value.value==='No'){
      row.value = "No";
      row.seizure = false;
      row.checked = true;
    }
    else{
      row.value = "?";
      row.checked = false;
      //row.seizure = true; //don't delete
    }
    this._updateMetrics();
  }

  
  removeNonSeizure(){
    console.log(this.agcsData.Events);

    let filteredArray: Event[] = [];
    filteredArray = this.agcsData.Events.filter(function(row, index, arr){
      return !row.checked || row.seizure;
    });
    this.agcsData.Events = filteredArray.slice();    
    this.dataSource = new MatTableDataSource<Event>(this.agcsData.Events);
    this._updateMetrics();
  }

}
