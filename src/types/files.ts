export interface IFile {
  _id?: string;

  name?: string;
  text?: string;
  type?: string;
  size?: number;
  data?: Buffer;
  ready: boolean;
}