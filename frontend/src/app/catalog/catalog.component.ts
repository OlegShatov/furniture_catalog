import { Component } from "@angular/core";
import { first } from "rxjs/operators";

import { Item } from "@app/_models";
import { ItemService } from "@app/_services";

@Component({ templateUrl: "catalog.component.html" })
export class CatalogComponent {
  loading = false;
  items: Item[];

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.loading = true;
    this.itemService
      .getAll()
      .pipe(first())
      .subscribe((items) => {
        this.loading = false;
        this.items = items;
      });
  }
}
