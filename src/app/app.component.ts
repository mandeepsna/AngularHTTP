import { Component } from '@angular/core';
import{HttpClient}from'@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  constructor(private  http:HttpClient)
  {

  }
  title = 'AngularHTTP';
  productDetails:any;
  AddProduct(product:{name:string,desc:string,price:string})
  {
     this.http.post('https://angularbyproacademy-c892f-default-rtdb.firebaseio.com/product.json',product).subscribe(response=>{});
  }
  private FetchProduct()
  {
    this.http.get('https://angularbyproacademy-c892f-default-rtdb.firebaseio.com/product.json')
    .pipe(map((response)=>
    {
       const products=[];  
      for(let key in response)
        {
           if(response.hasOwnProperty(key))
           {
           products.push({...response[key],id:key})
        } 
      }
      return products;
    }))
    .subscribe((response)=>
    {
         this.productDetails=response;
         console.log(this.productDetails);
    })
  }
  ngOnInit()
  {
    this.FetchProduct();
  }
  OnclickFetch(my_form)
  {
    this.FetchProduct();
    my_form.reset();
  }
  onClickDelete(id:string)
  {
     this.http.delete('https://angularbyproacademy-c892f-default-rtdb.firebaseio.com/product/'+id+'.json').subscribe();
  }
  DeleteAll()
  {
    this.http.delete('https://angularbyproacademy-c892f-default-rtdb.firebaseio.com/product.json').subscribe();
  }
}
