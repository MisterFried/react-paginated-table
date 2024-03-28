// ** Import core packages
import React from "react";
import { useState, useEffect, useCallback } from "react";

// ** Import components
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

// ** Import utils / lib
import sortItems from "../utils/sortItems";
import filterItems from "../utils/filterItems";

// ** Import styles
import "../styles/styles.css";

// ** Import types
import {
	PaginatedTableProps,
	itemInterface,
	parametersInterface,
} from "./PaginatedTable.types";

export default function PaginatedTable({
	title,
	items,
	action = { title: undefined, function: undefined, label: undefined },
	headers,
	paginateOptions = [5, 10, 15],
}: PaginatedTableProps) {
	const [totalItems, setTotalItems] = useState(items); // All items
	const [filteredItems, setFilteredItems] = useState(totalItems); // Items after filtering
	const [paginatedItems, setPaginatedItems] = useState<itemInterface[]>([]); // Filtered items after pagination

	// Filter / sort parameters
	const [parameters, setParameters] = useState<parametersInterface>({
		filter: "",
		sort: [headers[0].sortText, "asc"],
	});

	// Remove unnecessary pagination options (greater than the number of items)
	paginateOptions.sort((a, b) => a - b);
	const index = paginateOptions.findIndex(
		option => option >= filteredItems.length
	);
	const adjustedPaginatedOptions =
		index !== -1 ? paginateOptions.slice(0, index + 1) : paginateOptions;

	// Pagination params (items per page and current page)
	const [paginationParams, setPaginationParams] = useState({
		perPage: adjustedPaginatedOptions[0],
		page: 0,
	});

	let totalPage = Math.ceil(filteredItems.length / paginationParams.perPage);
	if (filteredItems.length === 0) totalPage = 1;

	// Calculate the interval of currently displayed items
	const paginationMin = paginationParams.page * paginationParams.perPage + 1;
	const paginationMax = Math.min(
		filteredItems.length,
		(paginationParams.page + 1) * paginationParams.perPage
	);

	/**
	 * Paginates the filtered items based on the given parameters.
	 *
	 * @param perPageParams - The number of items per page.
	 * @param pageParams - The current page number.
	 */
	const paginate = useCallback(
		(perPage: number, page: number) => {
			const itemsAfterPagination = filteredItems.slice(
				page * perPage,
				(page + 1) * perPage
			);

			setPaginatedItems(itemsAfterPagination);
		},
		[filteredItems]
	);

	// Filter the items and update the filter parameters
	function handleFilter(value: string) {
		const filterFields = headers.map(header => header.sortText);
		const result = filterItems(totalItems, value, filterFields);
		setParameters({ ...parameters, filter: value });
		setFilteredItems(result);
	}

	// Sort the items and update the sort parameters
	function handleSort(order: "asc" | "desc", field: string) {
		const sortedItems = sortItems([...filteredItems], field, order);

		setParameters({ ...parameters, sort: [field, order] });
		setFilteredItems(sortedItems);
	}

	// Update the total and filtered items list when the data changes
	useEffect(() => {
		const filterFields = headers.map(header => header.sortText);
		const itemsFiltered = filterItems(
			items,
			parameters.filter,
			filterFields
		);
		const itemsSorted = sortItems(
			itemsFiltered,
			parameters.sort[0],
			parameters.sort[1]
		);

		setTotalItems(items);
		setFilteredItems(itemsSorted);
	}, [items, parameters, headers]);

	// Update the pagination when page or perPage changes, or when the items are filtered
	useEffect(() => {
		paginate(paginationParams.perPage, paginationParams.page);
	}, [paginate, paginationParams, filteredItems]);

	// Prevent being on a page that doesn't exist when the number of records per page changes
	useEffect(() => {
		if (paginationParams.page >= totalPage) {
			setPaginationParams({
				...paginationParams,
				page: totalPage - 1,
			});
		}
	}, [totalPage, paginationParams]);

	return (
		<div className="flex flex-col gap-8 rounded-md border border-gray-300 bg-gradient-to-br from-gray-50 to-gray-200 p-4 shadow-md">
			{/* Pagination and filter */}
			<h2 className="text-center text-2xl font-bold">{title}</h2>
			<section className="flex flex-col justify-between gap-4 p-1 sm:flex-row">
				<div>
					{adjustedPaginatedOptions.length > 1 &&
						filteredItems.length > 0 && (
							<label
								className="flex items-center gap-2"
								htmlFor="paginate"
							>
								Show{" "}
								<select
									name="paginate"
									id="paginate"
									onChange={e =>
										setPaginationParams({
											...paginationParams,
											perPage: Number(e.target.value),
										})
									}
									className="rounded-md border border-gray-300 bg-white p-2"
								>
									{adjustedPaginatedOptions.map(option => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>{" "}
								records
							</label>
						)}
				</div>
				<input
					type="text"
					placeholder="Search"
					onChange={e => handleFilter(e.target.value)}
					className="rounded-md border border-gray-300 bg-white p-2"
				/>
			</section>

			{/* Table */}
			<div
				className="overflow-x-auto"
				style={{
					scrollbarColor: "rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.2)",
					scrollbarWidth: "thin",
				}}
			>
				<table className="mx-auto border border-gray-400">
					<thead>
						<tr className="bg-gray-300">
							{headers.map(header => {
								return (
									<TableHeader
										key={`th_${header.sortText}`}
										title={header.title}
										sortText={header.sortText}
										reorderAlphabetically={handleSort}
										activeSort={`${parameters.sort[0]}_${parameters.sort[1]}`}
									/>
								);
							})}

							{action.title && (
								<th className="relative border border-gray-400 px-4 py-4">
									{action.title}
								</th>
							)}
						</tr>
					</thead>
					<tbody>
						{paginatedItems.length === 0 ? (
							<tr className="even:bg-gray-100">
								<td
									colSpan={10}
									className="border border-gray-400 p-2 px-4 text-center"
								>
									No records to display !
								</td>
							</tr>
						) : (
							paginatedItems.map(item => (
								<TableRow
									key={item.id}
									item={item}
									headers={headers}
									action={action}
								/>
							))
						)}
					</tbody>
				</table>
			</div>

			{/* Per page display and page navigation */}
			<section className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end">
				<span>
					{filteredItems.length === 0
						? "Showing 0 records"
						: `Showing ${paginationMin} to ${paginationMax} of ${filteredItems.length} records 
						${filteredItems.length !== totalItems.length ? "(filtered)" : ""}`}
				</span>
				<div className="flex items-center justify-center gap-4">
					<span>
						Page {paginationParams.page + 1} of {totalPage}
					</span>
					{paginationParams.page >= 1 && (
						<button
							onClick={() =>
								setPaginationParams({
									...paginationParams,
									page: paginationParams.page - 1,
								})
							}
							className="rounded-md border border-gray-400 bg-gray-300 px-4 py-2 transition-all hover:bg-gray-400 focus:bg-gray-400"
						>
							Previous page
						</button>
					)}
					{paginationParams.page < totalPage - 1 && (
						<button
							onClick={() =>
								setPaginationParams({
									...paginationParams,
									page: paginationParams.page + 1,
								})
							}
							className="rounded-md border border-gray-400 bg-gray-300 px-4 py-2 transition-all hover:bg-gray-400 focus:bg-gray-400"
						>
							Next page
						</button>
					)}
				</div>
			</section>
		</div>
	);
}
