import { Item } from "../_models/item";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";

@Injectable({ providedIn: "root" })
export class ItemService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Item[]>(`${environment.apiUrl}/items`);
  }

  getDescription(id) {
    return this.http.get(`${environment.apiUrl}/items/desc/${id}`);
  }

}
