export interface PaginatedTableProps {
	title: string;
	items: Array<itemInterface>;
	headers: Array<{ title: string; sortText: string }>;
	action?: {
		title: string | undefined;
		function: ((id: string) => void) | undefined;
		label: string | undefined;
	};
	paginateOptions?: Array<number>;
}

export interface parametersInterface {
	filter: string;
	sort: [string, "asc" | "desc"];
}

export interface itemInterface {
	id: string;
	[key: string]: string | number;
}

export interface TableRowProps {
	item: itemInterface;
	headers: Array<{
		title: string;
		sortText: string;
	}>;
	action: {
		title: string | undefined;
		function: ((id: string) => void) | undefined;
		label: string | undefined;
	};
}

export interface TableHeaderProps {
	title: string;
	sortText: string;
	reorderAlphabetically: (order: "asc" | "desc", field: string) => void;
	activeSort: string;
}
