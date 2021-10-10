export interface Screen {
  id?: number;
	active: boolean;
	fatherScreenId?: number;
	name: string;
	image:  string;
	order:  number;
	versionId:  number;
	versionClonedId?:  number;
}

export interface createScreen {
  id? :number;
  name: string;
  image: string;
  active: boolean;
  order: number;
  urlog: string;
  versionId: number;
  screenFatherId?: number;
  cloneVersionId?:number;
}
