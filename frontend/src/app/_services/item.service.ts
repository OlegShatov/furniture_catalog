import { Item } from "../_models/item";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { Subject } from 'rxjs';

@Injectable({ providedIn: "root" })
export class ItemService {
  constructor(private http: HttpClient) {}

  public description = new Subject();

  getAll() {
    return this.http.get<Item[]>(`${environment.apiUrl}/items`);
  }

  getDescription(id) {
    return this.http.get(`${environment.apiUrl}/items/desc/${id}`);
  }

  setDescription(desc: any) {
    this.description.next(desc);
  }
}
