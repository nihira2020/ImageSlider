import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MasterService } from '../service/master.service';
import * as alertifyjs from 'alertifyjs'
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  Productlist: any;
  productImage: any;
  EditProductCode = '';
  Result: any;
  file!: File; // Variable to store file
  progressvalue = 0;

  constructor(private service: MasterService, private modalService: NgbModal, private httpclient: HttpClient) { }
  @ViewChild('content') addview !: ElementRef;
  @ViewChild('fileupload') fileupload !: ElementRef;

  ngOnInit(): void {
    this.Getallproducts();
  }

  UploadImage(code: any, image: any) {
    this.open();
    this.productImage = image;
    this.EditProductCode = code;

  }
  RemoveImage(code: any, name: any) {
    if (confirm("Do you want remove the product : " + name + " ?")) {
      this.service.RemoveImage(code).subscribe(result => {
        alertifyjs.success("Image removed successfully.");
        this.Getallproducts();
      });
    }
  }
  ProceedUpload() {
    let formdata = new FormData();
    formdata.append("file", this.file, this.EditProductCode)
    this.service.UploadImage(formdata).pipe(

      map(events => {
        switch (events.type) {
          case HttpEventType.UploadProgress:
            this.progressvalue = Math.round(events.loaded / events.total! * 100);
            break;
          case HttpEventType.Response:
            this.Getallproducts();
            alertifyjs.success("Upload completed");
            setTimeout(() => {
              this.progressvalue = 0;
            }, 2500);
            break;

        }
      }),
      catchError((error: HttpErrorResponse) => {
        alertifyjs.error('Failed to upload')
        return of("failed");
      })

    ).subscribe(result => {
      // this.Getallproducts();
      // alertifyjs.success("Upload completed");
    });

  }
  onchange(event: any) {
    let reader = new FileReader();
    this.file = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.productImage = reader.result;
    };

  }

  Getallproducts() {
    this.service.GetProduct().subscribe(result => {
      this.Productlist = result;
    });
  }
  GetProductInfo(code: any, prodimage: any, name: any) {
    this.productImage = prodimage;
    this.EditProductCode = code;
    this.open();
  }
  open() {
    this.modalService.open(this.addview, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}
