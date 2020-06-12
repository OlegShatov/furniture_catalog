import { Component, OnInit } from "@angular/core";
import { ItemService } from "@app/_services";

@Component({
  selector: "app-itemcard",
  templateUrl: "./itemcard.component.html",
  styleUrls: ["./itemcard.component.less"],
})
export class ItemcardComponent implements OnInit {
  constructor(private itemService: ItemService) {}

  itemDescription: any;

  ngOnInit() {
    this.itemService.description.subscribe((desc: any) => {
      this.itemDescription = desc;
    });
  }
}
