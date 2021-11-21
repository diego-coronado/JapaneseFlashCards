export interface Type {
  id: string;
  name: string;
}

export interface Option {
  id: string | number;
  name: string;
  [_: string]: any;
}
