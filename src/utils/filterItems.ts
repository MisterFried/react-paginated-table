import { itemInterface } from "../components/PaginatedTable.types";

/**
 * Filters the items list based on the provided value.
 * @param itemsList - The array of items to filter.
 * @param value - The value to search for in the items properties.
 * @returns The filtered array of employees.
 */
export default function filterItems(
	itemsList: Array<itemInterface>,
	value: string,
	fields: Array<string>
) {
	const filteredItemsList = itemsList.filter(item => {
		let match = false;

		for (const field of fields) {
			if (
				String(item[field]).toLowerCase().includes(value.toLowerCase())
			) {
				match = true;
				break;
			}
		}

		return match;
	});

	return filteredItemsList;
}
