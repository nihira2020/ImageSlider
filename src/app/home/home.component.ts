import { Component, ElementRef, ViewChild,OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MasterService } from '../service/master.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Filehandling';
  Productlist: any;
  Imagelist: any;
  @ViewChild('content') addview !: ElementRef;
  constructor(private service: MasterService, private modalService: NgbModal) {
    this.Getallproducts();
  }
  Getallproducts() {
    this.service.GetProduct().subscribe(result => {
      this.Productlist = result;
    });
  }
  Getproductslide(code: any) {
    this.service.GetProductbycode(code).subscribe(result => {
      this.Imagelist = result;
    })
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


  ngOnInit(): void {
  }

}
