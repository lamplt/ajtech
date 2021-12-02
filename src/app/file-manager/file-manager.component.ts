import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EEGFile, EEGFileList } from '../agcs-data';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {
  displayedColumns: string[] = ['icon', 'name',  'action'];
  eegFiles: EEGFileList;
  dataSource = new MatTableDataSource<EEGFile>();

  constructor(
    private httpService: HttpClient
  ) { }

  ngOnInit(): void {
    this._readFlatFile();
  }

  private _readFlatFile() {
     this.httpService.get('./assets/file_json_data.txt').subscribe(
      data => {       
        this.eegFiles = data as EEGFileList;       
        this.dataSource = new MatTableDataSource<EEGFile>(this.eegFiles.fileList);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }

  public processFile(file:EEGFile){
    console.log('Sending the file:'+file.name+' to API server.... '); 
    //this.httpService.get('https://fmsub-appointment-dev.azurewebsites.net/api/appointments/'+file.name).subscribe(
    this.httpService.get('https://fmsub-appointment-dev.azurewebsites.net/api/appointments/a9dab091-9ae8-41d1-8f44-393b0efaea29').subscribe(
      data => {       
        console.log(data);
        file.processed = true;
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }

}
