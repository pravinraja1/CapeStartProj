import { Component, OnInit, ViewChild, ViewChildren, QueryList, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { AlertService } from '@/_helpers';
import { MastersService } from '@/_services/masters.service';
import { LibraryService } from '@/_services/library.service';
import { environment } from '@/../environments/environment';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  authorList :any=[];
  publisherList :any=[];
  displayedColumnsForLibrary: string[] = [
    'id',
    'book_name',
    'book_desc',
    'book_author',
    'publisher_name',
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
  masterForm:FormGroup;


  constructor(
  	private alertService:AlertService,
    public dialog: MatDialog,
  	private mastersService:MastersService,
  	private libraryService:LibraryService,
  	) {
  		this.addBookForm = new FormGroup({
  			'book_name' : new FormControl('',[Validators.required]),
  			'book_desc' : new FormControl('',[Validators.required]),
  			'book_author' : new FormControl('',[Validators.required]),
  			'publisher_name' : new FormControl('',[Validators.required]),
  			'book_image' : new FormControl('',[Validators.required]),
      })
      this.masterForm=new FormGroup({
        'category' :new FormControl('',[Validators.required]),
        'name'     :new FormControl('',[Validators.required]),
      })
   }

  ngOnInit(): void {
    this.getAllLibrary();
    this.findAllAuthor();
    this.findALLPublisher();
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

  getAllLibrary(){

    this.mastersService.getAllLibrary()
    .subscribe((res:any)=>{
      this.LibraryList.data=res;
    });
  }
  findAllAuthor(){

    this.libraryService.findAllAuthor()
    .subscribe((res:any)=>{
      for(var i in res)
      this.authorList.push(res[i]);
    });
  }
  findALLPublisher(){
    this.libraryService.findALLPublisher()
    .subscribe((res:any)=>{
      for(var i in res)
          this.publisherList.push(res[i]);
    });

  }
  addMaster(){
    if (this.masterForm.invalid) {
      this.alertService.errorSnackBar('Please fill All Required fields!');
      return;
    }
    if (this.masterForm.controls["category"].value=="Author"){
      this.libraryService.addAuthor(this.masterForm.value)
      .subscribe(res=>{
        this.getAllLibrary();
        this.findAllAuthor();
        this.findALLPublisher();
        this.alertService.successSnackBar("Successfully Added to Master");
        this.addBookForm.reset();
        this.formDirectives.forEach((formDirective: FormGroupDirective) => {
          formDirective.resetForm();
      });
    });
  }
  else{
    this.libraryService.addPublisher(this.masterForm.value)
    .subscribe(res=>{
      this.getAllLibrary();
      this.findAllAuthor();
      this.findALLPublisher();
      this.alertService.successSnackBar("Successfully Added to Master");
      this.addBookForm.reset();
      this.formDirectives.forEach((formDirective: FormGroupDirective) => {
        formDirective.resetForm();
      });
    });
    }
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
      this.getAllLibrary();
      this.alertService.successSnackBar("Book Added To Library Successfully");
      this.addBookForm.reset();
      this.formDirectives.forEach((formDirective: FormGroupDirective) => {
        formDirective.resetForm();
      });
    });
  }


  deleteLibrary(id){
    this.mastersService.deleteLibrary(id)
    .subscribe((res:any)=>{
      this.getAllLibrary();
      this.alertService.successSnackBar("Book Deleted Successfully");
    });
  }

  goToView(id){
    const dialogRef = this.dialog.open(ViewBookComponent, {
      data: {
        id: id
      }
    } );

    dialogRef.afterClosed().subscribe(result => {
      this.getAllLibrary();
    });

  }

}


@Component({
  selector: 'app-admin-view-Library',
  templateUrl: 'admin-view.component.html',
  styleUrls: ['./add-book.component.scss']

})
export class ViewBookComponent  {
  LibraryData:any;
  baseUrl = environment.apiUrl;
  updateBookForm:FormGroup;

  constructor(public dialogRef: MatDialogRef<ViewBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertService:AlertService,
    private mastersService:MastersService) {
      this.updateBookForm = new FormGroup({
          'book_name' : new FormControl(''),
          'book_desc' : new FormControl(''),
          'book_author' : new FormControl(''),
          'publisher_name' : new FormControl(''),
          'book_image' : new FormControl(''),
      })
  }

  ngOnInit(): void {
    this.getLibrary(this.data.id);
  }

  updateLibrary(){
    const image_from_form = this.updateBookForm.get('book_image').value;
    console.log(image_from_form);
    console.log("image_from_form");
    const book_image = image_from_form.files==undefined?"":image_from_form.files[0];
    console.log(book_image);
    const data =this.updateBookForm.value;
    var formData= new FormData();
    for ( const key of Object.keys(data) ) {
      const value =data[key];
      formData.append(key, value);
    }
    if(book_image!=""){
      console.log(book_image);
      formData.append("book_image", book_image);
    }
    formData.append("id", this.data.id);
    this.mastersService.updateLibrary(this.data.id,formData)
    .subscribe((res:any)=>{
      this.dialogRef.close();
      this.alertService.successSnackBar("Updated Successfully");
    });
  }

  getLibrary(id){
    this.mastersService.getLibrary(id)
    .subscribe((res:any)=>{
      this.LibraryData=res;
      this.updateBookForm.patchValue({
          "book_name":this.LibraryData.book_name,
          "book_desc":this.LibraryData.book_desc,
          "book_author":this.LibraryData.book_author,
          "publisher_name":this.LibraryData.publisher_name,
      });
    });
  }
}
