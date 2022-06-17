export interface INote {
  id: number;
  title: string;
  content: string;
  date: number;
  tags: Tag[];
}

export type RowNotes = string;

export type Tag = string;
