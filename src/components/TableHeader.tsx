// ** Import core packages
import React from "react";

// ** Import types
import { TableHeaderProps } from "./PaginatedTable.types";

export default function TableHeader({
	title,
	sortText,
	reorderAlphabetically,
	activeSort,
}: TableHeaderProps) {
	return (
		<th className="relative whitespace-nowrap border border-gray-400 px-4 py-4 pr-8 transition-all">
			{title}
			<button
				onClick={() => reorderAlphabetically("asc", sortText)}
				className={`${activeSort === `${sortText}_asc` ? "opacity-100" : "opacity-40"} absolute bottom-2/4 right-1 -rotate-90 cursor-pointer transition-all`}
			>
				{">"}
			</button>
			<button
				onClick={() => reorderAlphabetically("desc", sortText)}
				className={`${activeSort === `${sortText}_desc` ? "opacity-100" : "opacity-40"} absolute right-1 top-2/4 -rotate-90 cursor-pointer transition-all`}
			>
				{"<"}
			</button>
		</th>
	);
}
