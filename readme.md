# react-paginated-table

react-paginated-table is a npm package based on react made to integrate paginated, filtered, and sortable tables into your web applications. It is build using react, typescript and tailwindcss.

## Installation

Install the package using npm.

```bash
  npm install react-paginated-table
```

Add the table component in your project.

```javascript
import PaginatedTable from "react-paginated-table";
```

Use it like a standard react component.

```javascript
<PaginatedTable
	title="Banana Store"
	items={items}
	headers={headers}
	action={action}
	paginateOptions={[4, 6, 8]}
/>
```

## Usage

### Arguments

The _PaginatedTable_ component can take up to 5 arguments :

-   **title**: A string displayed on top of the table.

-   **items**: An array of object with the items to display. Each object must have at least an id property (string), the rest of the properties must be of type string or number.

-   **headers**: An array of object defining the displayed column. Each object must be composed of two properties :

    -   **title**: The title for the column header.
    -   **sortText**: The associated property name in the item object (used for sorting and filtering).

-   **action** (Optional): An object defining the action column, can be omitted if no action column is wanted. Must contains the following properties :

    -   **title**: The title for the action column header.
    -   **function**: The function to be executed when pressing the action button. The id of the corresponding item is given as parameter.
    -   **label**: The label on the action buttons.

-   **paginateOptions** (Optional): An array of number defining the different options for the number of items to be displayed per page. If omitted, a default value of [5, 10, 15] is set. (_Note: for more clarity, any value higher than the total amount of items will not be displayed. If no value remains, the corresponding input will not be displayed at all_).

### Functionality

-   Items can be sorted based on any of the provided header field, in a descending or ascending order. _By default, items are going to be ordered in ascending order for the first provided header field_.

-   Items can be filtered based on a text input. The search is performed on every field of the item.

See more details below with the examples.

## Example

An example using the following parameters :

1. **items**

```javascript
const items = [
	{
		id: "1",
		name: "French Bananas",
		origin: "France",
		weight: 150,
		price: 1.99,
		quantity: 100,
	},
	{
		id: "2",
		name: "Space Bananas",
		origin: "Unknown",
		weight: 1000,
		price: 99.99,
		quantity: 10,
	},
	{
		id: "3",
		name: "Golden Bananas",
		origin: "United Kingdom",
		weight: 500,
		price: 50.0,
		quantity: 500,
	},
	{
		id: "4",
		name: "Red Bananas",
		origin: "Vietnam",
		weight: 170,
		price: 6.5,
		quantity: 500,
	},
	{
		id: "5",
		name: "Crispy Bananas",
		origin: "Vietnam",
		weight: 200,
		price: 7.5,
		quantity: 500,
	},
	{
		id: "6",
		name: "Spicy Bananas",
		origin: "Mexico",
		weight: 120,
		price: 4.99,
		quantity: 500,
	},
];
```


2. **headers**

```javascript
const headers = [
	{
		title: "Name",
		sortText: "name",
	},
	{
		title: "Origin",
		sortText: "origin",
	},
	{
		title: "Weight",
		sortText: "weight",
	},
	{
		title: "Price",
		sortText: "price",
	},
	{
		title: "Stock",
		sortText: "quantity",
	},
];
```


3. **action**

```javascript
const action = {
	title: "Action",
	function: (id: string) => {
		console.log("The id is : " + id);
	},
	label: "Log ID",
}
```


4. **Component**

```javascript
<PaginatedTable
	title="Banana Store"
	items={items}
	headers={headers}
	action={action}
	paginateOptions={[4, 6, 8]}
/>
```


5. **Result**

Desktop
![react-paginated-table](/docs/react-paginated-table.PNG?raw=true)

Mobile (_table is scrollable if necessary_)
![react-paginated-table mobile](/docs/react-paginated-table-mobile.PNG?raw=true)
