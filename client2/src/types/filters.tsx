export class FilterSelectItem {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  static deserialize(input: any): FilterSelectItem {
    return new FilterSelectItem(input.id, input.name);
  }

  static deserializeList(input: any[]): FilterSelectItem[] {
    return input?.map((room) => FilterSelectItem.deserialize(room));
  }
}

export class FilterSelect {
  title: string;
  values?: FilterSelectItem[];
  active: string;

  constructor(title: string, values: FilterSelectItem[], active: string) {
    this.title = title;
    this.values = values;
    this.active = active;
  }

  getTitle(): string {
    return this.title;
  }

  getValues(): FilterSelectItem[] {
    if (!this.values) {
      return [];
    }
    return this.values;
  }

  getActive(): string {
    return this.active;
  }

  getValuesFormatted(): { value: string; label: string }[] {
    console.log("getValuesFormatted", this?.values);
    if (!this?.values) {
      return [];
    }
    return this?.values?.map((value:FilterSelectItem) => {
        return { value: value?.id, label: value?.name };
        });
    }

  static deserialize(input: any): FilterSelect {
    return new FilterSelect(input.title, input.values, input.active);
  }

  static deserializeList(input: any[]): FilterSelect[] {
    return input?.map((room) => FilterSelect.deserialize(room));
  }
}
