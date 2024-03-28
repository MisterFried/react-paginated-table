import { itemInterface } from "../components/PaginatedTable.types";

/**
 * Sorts an array of items based on a specified field in ascending or descending order.
 * @param itemList - The array of items to be sorted.
 * @param order - The order in which the items should be sorted. Can be "asc" for ascending or "desc" for descending.
 * @param field - The field of the items object to be used for sorting.
 * @returns The sorted array of items.
 */
export default function sortEmployees(
	itemList: Array<itemInterface>,
	field: string,
	order: "asc" | "desc"
) {
	if (order === "asc") {
		itemList.sort((a, b) => {
			if (typeof a[field] === "number" && typeof b[field] === "number") {
				if (a[field] < b[field]) return -1;
				if (a[field] > b[field]) return 1;
				return 0;
			} else if (
				typeof a[field] === "string" &&
				typeof b[field] === "string"
			) {
				if (
					(a[field] as string).toLowerCase() <
					(b[field] as string).toLowerCase()
				)
					return -1;
				if (
					(a[field] as string).toLowerCase() >
					(b[field] as string).toLowerCase()
				)
					return 1;
				return 0;
			}
		});
	} else if (order === "desc") {
		itemList.sort((a, b) => {
			if (typeof a[field] === "number" && typeof b[field] === "number") {
				if (a[field] < b[field]) return 1;
				if (a[field] > b[field]) return -1;
				return 0;
			} else if (
				typeof a[field] === "string" &&
				typeof b[field] === "string"
			) {
				if (
					(a[field] as string).toLowerCase() <
					(b[field] as string).toLowerCase()
				)
					return 1;
				if (
					(a[field] as string).toLowerCase() >
					(b[field] as string).toLowerCase()
				)
					return -1;
				return 0;
			}
		});
	}

	return itemList;
}
