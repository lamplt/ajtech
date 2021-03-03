import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AGCSData, Events } from './agcs-data';
import { MatDialog } from '@angular/material/dialog';
import { ImageViewComponent } from './image-view/image-view.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  displayedColumns: string[] = ['time', 'Image_40_s', 'Image_10_s_1', 'Image_10_s_2', 'Image_10_s_3', 'Image_10_s_4', 'action'];
  
  dataSource = new MatTableDataSource<Events>();
  agcsData : AGCSData;
  

  constructor (
    private httpService: HttpClient,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    console.log("READING DATA=====>")
    this.httpService.get('./assets/agcs_json_data.txt').subscribe(
      data => {
        this.agcsData = data as AGCSData;	
        //console.log(JSON.stringify(this.agcsData));
        console.log("ARRAY: "+JSON.stringify(this.agcsData.Events));
        this.dataSource = new MatTableDataSource<Events>(this.agcsData.Events);
        //console.log("ARRAY: "+JSON.stringify(this.dataSource));
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }

  processRow(row: Events, src:string){
    console.log(JSON.stringify(row));
    row.checked = true;
    this.openImage(src);
  }

  openImage(src:string){
    console.log(src);
    const dialogRef = this.dialog.open(
                        ImageViewComponent, 
                        {data: { source: src }}
                      );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  onChange(value: MatSlideToggleChange) {
    const { checked } = value;
    console.log("On Change ==========>");
    console.log(value);

    // this.fakeService.throwUp(checked).subscribe(
    //   () => {},
    //   () => {
    //      setTimeout(() => this.isChecked = this.isCheckedInit, 0);
    //   }
    // );
  }

  


}
