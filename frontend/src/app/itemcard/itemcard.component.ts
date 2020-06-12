import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { ItemService } from "@app/_services";

@Component({
  selector: "app-itemcard",
  templateUrl: "./itemcard.component.html",
  styleUrls: ["./itemcard.component.less"],
})
export class ItemcardComponent implements OnInit {
  constructor(private itemService: ItemService, private activateRoute: ActivatedRoute) {
    this.id = activateRoute.snapshot.params['id'];
  }

  itemDescription: any;
  id: number;
  images: any;

  ngOnInit() {
    this.itemService.getDescription(this.id).subscribe((desc: any) => {
      this.itemDescription = desc;
    });
    this.itemService.getImages(this.id).subscribe((res: any) => {
      this.images = res;
      console.log("Images: ", this.images);
    });
  }
}
