import { Component, OnInit, ViewChild, ViewChildren, QueryList, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { AlertService } from '@/_helpers';
import { MastersService } from '@/_services/masters.service';
import { environment } from '@/../environments/environment';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss']
})
export class MyBooksComponent implements OnInit {

  displayedColumnsForLibrary: string[] = [
    'id',
    'book_name',
    'book_desc',
    'book_author',
    'book_image',
    'actions',
  ];
  baseUrl = environment.apiUrl;

  @ViewChild('paginatorForLibrary')
  paginatorForLibrary: MatPaginator;

  @ViewChild('sortForLibrary')
  sortForLibrary: MatSort;

  LibraryList = new MatTableDataSource([]);

  @ViewChildren(FormGroupDirective)
  formDirectives: QueryList<FormGroupDirective>;

  addBookForm:FormGroup;


  constructor(
  	private alertService:AlertService,
    public dialog: MatDialog,
  	private mastersService:MastersService,
  	) {
  		this.addBookForm = new FormGroup({
  			'book_name' : new FormControl('',[Validators.required]),
  			'book_desc' : new FormControl('',[Validators.required]),
  			'book_author' : new FormControl('',[Validators.required]),
  			'book_image' : new FormControl('',[Validators.required]),
  		})
   }

  ngOnInit(): void {
    this.getAllLendedLibrary();
  }

  ngAfterViewInit() {

    this.LibraryList.paginator = this.paginatorForLibrary;
    this.LibraryList.sort = this.sortForLibrary;
  }

  applyFilterForLibrary(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.LibraryList.filter = filterValue.trim().toLowerCase();


    if (this.LibraryList.paginator) {
      this.LibraryList.paginator.firstPage();
    }
  }

  getAllLendedLibrary(){

    this.mastersService.getAllLendedLibrary()
    .subscribe((res:any)=>{
      this.LibraryList.data=res;
    });
  }

  addLibrary(){
    if (this.addBookForm.invalid) {
      this.alertService.errorSnackBar('Please fill All Required fields!');
      return;
    }
    const image_from_form = this.addBookForm.get('book_image').value;
    const book_image = image_from_form.files[0];
    const data =this.addBookForm.value;
    var formData= new FormData();
    for ( const key of Object.keys(data) ) {
      const value =data[key];
      formData.append(key, value);
    }
    if(book_image!=undefined){
      formData.append("book_image", book_image);
    }
    this.mastersService.addLibrary(formData)
    .subscribe(res=>{
      this.getAllLendedLibrary();
      this.alertService.successSnackBar("Book To Library Successfully");
      this.addBookForm.reset();
      this.formDirectives.forEach((formDirective: FormGroupDirective) => {
        formDirective.resetForm();
      });
    });
  }


  goToLend(id){
    const dialogRef=this.dialog.open(ViewBookComponent,{} );
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result=="Yes"){
        this.mastersService.notLendBook(id)
        .subscribe((res:any)=>{
          this.alertService.successSnackBar("Book Returned Successfully");
          this.getAllLendedLibrary();
        });
      }
    });
  }

}


@Component({
  selector: 'app-view-Book',
  templateUrl: 'view-my-Book.component.html',
  styleUrls: ['./my-books.component.scss']
})
export class ViewBookComponent  {
  constructor() {}

  ngOnInit(): void {
  }
}