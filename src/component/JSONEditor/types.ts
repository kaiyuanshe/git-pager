export interface DataMeta {
  type: string;
  key?: string | number;
  value: any;
  children?: DataMeta[];
}
