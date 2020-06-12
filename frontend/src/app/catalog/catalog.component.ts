import { Component } from "@angular/core";

import { Item } from "@app/_models";
import { ItemService } from "@app/_services";

@Component({ templateUrl: "catalog.component.html" })
export class CatalogComponent {
  loading = false;
  items: Item[];
  itemDescription: string;

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.loading = true;
    this.itemService.getAll().subscribe((items) => {
      this.loading = false;
      this.items = items;
      console.log(this.items);
    });
  }

  setIdItem(id: BigInteger) {
    this.itemService.getDescription(id).subscribe((desc: []) => {
      this.itemDescription = JSON.stringify(desc);
      console.log(this.itemDescription);

      this.itemService.setDescription(this.itemDescription);
    });
  }
}
