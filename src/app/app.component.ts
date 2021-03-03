import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AGCSData, Event } from './agcs-data';
import { MatDialog } from '@angular/material/dialog';
import { ImageViewComponent } from './image-view/image-view.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatButtonToggleChange } from '@angular/material/button-toggle';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  displayedColumns: string[] = ['time', 'Image_40_s', 'Image_10_s_1', 'Image_10_s_2', 'Image_10_s_3', 'Image_10_s_4', 'action'];
  
  dataSource = new MatTableDataSource<Event>();
  agcsData : AGCSData = null;
  

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
        //console.log("ARRAY: "+JSON.stringify(this.dataSource));
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }

  processRow(row: Event, src:string){
   
    row.checked = true;
    row.value = "Yes";
    row.seizure = true;
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
    }
    else{
      row.value = "No";
      row.seizure = false;
    }
  }

  
  removeNonSeizure(){
   for(let row of this.agcsData.Events){
     if(row.checked && !row.seizure){
      const index = this.agcsData.Events.indexOf(row, 0);
      if (index > -1) {
        this.agcsData.Events.splice(index, 1);
      }
     }
   }
   this.dataSource = new MatTableDataSource<Event>(this.agcsData.Events);
  }

}
