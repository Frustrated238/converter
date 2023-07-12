import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup} from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'currency';
  
  readonly ROOT_URL = '/api/p24api/pubinfo?exchange&json&coursid=11';
  
  data: any;
  uahValue: number = 1;
  firstValue: number = 0;
  secondValue: number = 0;

  
  UAH: number = 0;
  EUR: number = 0;
  USD: number = 0;
  

  firstForm = new FormGroup({
    firstNumber: new FormControl(),
    firstSelector: new FormControl('USD')
  });

  secondForm = new FormGroup({
    secondNumber: new FormControl(),
    secondSelector: new FormControl('UAH')
  });

  constructor(private http: HttpClient) {
  }

  httpRequest():any {
    this.http.get<any[]>(this.ROOT_URL).subscribe(
      (response) => {
        this.EUR = response[0].buy;
        this.USD = response[1].buy;   
        }, (error) => {
        console.error('Error occured', error)
      }
    )
  }

  ngOnInit():void {
    this.data = this.http.get(this.ROOT_URL);
      window.onload = () => {
        this.httpRequest();
      };
  }

  inputToBaseUah(selector: string, inputNum: number) {
    switch(selector) {
      case('UAH'): this.uahValue = inputNum;
        break;
      case('USD'): this.uahValue = inputNum * this.USD;
        break;
      case('EUR'): this.uahValue = inputNum * this.EUR;
        break;
    }
  }

  firstInputHandler() {
    this.inputToBaseUah(String(this.firstForm.value.firstSelector),this.firstForm.value.firstNumber);
    this.renderSecondValue();
     
  }
  
  secondInputHandler() {
    this.inputToBaseUah(String(this.secondForm.value.secondSelector),this.secondForm.value.secondNumber);
    this.renderFirstValue();
  }

  renderValue(selector: string, targetNumber: number): number {
    switch(selector) {
      case('UAH'): targetNumber = +(this.uahValue / this.UAH).toFixed(4);
        break;
      case('USD'): targetNumber = +(this.uahValue / this.USD).toFixed(4);
        break;
      case('EUR'): targetNumber = +(this.uahValue / this.EUR).toFixed(4);
        break;
    }
    return targetNumber;
  }

  renderFirstValue() {
    let calcValue = this.renderValue(String(this.firstForm.value.firstSelector), this.firstValue);
    this.firstValue = calcValue;
  }

  renderSecondValue() {
    let calcValue = this.renderValue(String(this.secondForm.value.secondSelector), this.secondValue);
    this.secondValue = calcValue;
  }

  
  firstSelectHandler() {
    this.firstInputHandler();
  }
  
  secondSelectHandler() {
    this.secondInputHandler();
  }

}