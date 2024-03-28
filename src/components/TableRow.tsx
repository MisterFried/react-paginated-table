// ** Import core packages
import React from "react";

// ** Import types
import { TableRowProps } from "./PaginatedTable.types";

export default function TableRow({ item, headers, action }: TableRowProps) {
	return (
		<tr
			key={item.id}
			className="transition-all odd:bg-gray-200 even:bg-gray-100 hover:bg-cyan-100"
		>
			{headers.map(header => {
				return (
					<td
						key={`td_${header.sortText}`}
						className="whitespace-nowrap border border-gray-400 p-2 px-4"
					>
						{item[header.sortText]}
					</td>
				);
			})}
			{action.function && (
				<td className="border border-gray-400 p-2 px-4">
					<button
						onClick={() => action.function(item.id)}
						className="rounded-md bg-red-600 p-2 font-semibold text-white transition-all hover:bg-red-800 focus:bg-red-800"
					>
						{action.label}
					</button>
				</td>
			)}
		</tr>
	);
}
