import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { StocksService } from '../services/stocks.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {

  businessNews:Array<any>;
  stocksList: Array<any> = ['MSFT', 'AAPL', 'GOOG', 'AMZN', 'FB'] ;
  stocksResults: Array<any>;
  results = new Map();

  constructor(private dataService:DataService, private stocksService:StocksService) { }

  ngOnInit() {
    this.dataService.getBusinessNews().subscribe(businessNews => {
      this.businessNews = businessNews.articles;
    });

    this.stocksList.map((stock:string) => {
      this.getStockPrices(stock);
    });
  }

  async getStockPrices(stockName:string){
    await this.stocksService.getStockValues(stockName).subscribe(gtNews => {
      this.results.set(stockName, gtNews);
    });
  }
}