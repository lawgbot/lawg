import { data as kData } from './util/symbols.js';

export abstract class Structure<DataType, Omitted extends keyof DataType | '' = ''> {
	protected [kData]: Readonly<Partial<Omit<DataType, Omitted>>>;

	protected constructor(data: Readonly<Partial<Omit<DataType, Omitted>>>) {
		this[kData] = data;
	}

	public toJSON(): Partial<DataType> {
		return { ...this[kData] } as Partial<DataType>;
	}
}
