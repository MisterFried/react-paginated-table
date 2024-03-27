// ** Import core packages
import React from "react";

// ** Import icons

// ** Import assets

// ** Import pages

// ** Import third party

// ** Import shared components

// ** Import components

// ** Import sub pages / sections

// ** Import config

// ** Import state manager

// ** Import utils / lib

// ** Import hooks

// ** Import APIs

// ** Import styles
import "../styles/styles.css";

// ** Import Types

// ** Types
interface PaginatedTableProps {
	data: Array<{ [key: string]: string }>;
}

export default function PaginatedTable({ data }: PaginatedTableProps) {
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<h2 className="text-2xl font-bold">
				This is the paginated table component
			</h2>
			{data.map(item => (
				<p key={item.id} className="text-cyan-400">
					{item.name}
				</p>
			))}
		</div>
	);
}
