import { Component ,OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { MastersService } from '@/_services/masters.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  ngOnInit() {
    // this.getchartdata();
    
  }
  getchartdata(){
    this.mastersService.getchartdata().subscribe((res)=>{
        console.log(res);
    })
  }
  single = [{
    "name": "Total Books",
    "value": 8940000
  },
  {
    "name": "Books in Lend",
    "value": 5000000
  },
  {
    "name": "Books Back from lender",
    "value": 7200000
  }];
  multi: any=[{
    "name": "Total Books",
    "series": [
      {
        "name": "2010",
        "value": 7300000
      },
      {
        "name": "2011",
        "value": 8940000
      }
    ]
  },

  {
    "name": "Books in Lend",
    "series": [
      {
        "name": "2010",
        "value": 7870000
      },
      {
        "name": "2011",
        "value": 8270000
      }
    ]
  },

  {
    "name": "Books Back from lender",
    "series": [
      {
        "name": "2010",
        "value": 5000002
      },
      {
        "name": "2011",
        "value": 5800000
      }
    ]
  }];

  view: any[] = [700, 500];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Library';
  showYAxisLabel = true;
  yAxisLabel = 'Books';

  colorScheme = {
    domain: ['#7aa3e5', '#a8385d', '#aae3f5', '#AAAAAA']
  };

  constructor(private mastersService:MastersService) {
    
  }

  onSelect(event) {
    console.log(event);
  }


}