import React, { useMemo, useRef, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';


export default function Table({data}) {
    const columns = useMemo(
        () => [
          {
            accessorKey: 'timestamps',
            header: 'Timestamp', 
            filterVariant: 'text', // default
            size: 100,
          },
          {
            accessorKey: 'buildings',
            header: 'Buildings',
            Cell: ({ cell }) =>
              cell.getValue().toLocaleString('en-US', {
              }),
            filterVariant: 'range-slider',
            filterFn: 'betweenInclusive', // default (or between)
            muiTableHeadCellFilterSliderProps: {
              marks: true,
              max: 100, //custom max (as opposed to faceted max)
              min: 0, //custom min (as opposed to faceted min)
              step: 5,
              valueLabelFormat: (value) =>
                value.toLocaleString('en-US', {
                }),
            },
          },
          {
            accessorKey: 'cars',
            header: 'Cars',
            Cell: ({ cell }) =>
              cell.getValue().toLocaleString('en-US', {
              }),
            filterVariant: 'range-slider',
            filterFn: 'betweenInclusive', // default (or between)
            muiTableHeadCellFilterSliderProps: {
              marks: true,
              max: 400, //custom max (as opposed to faceted max)
              min: 0, //custom min (as opposed to faceted min)
              step: 5,
              valueLabelFormat: (value) =>
                value.toLocaleString('en-US', {
                }),
            },
          },
          {
            accessorKey: 'handbags',
            header: 'Handbags',
            Cell: ({ cell }) =>
              cell.getValue().toLocaleString('en-US', {
              }),
            filterVariant: 'range-slider',
            filterFn: 'betweenInclusive', // default (or between)
            muiTableHeadCellFilterSliderProps: {
              marks: true,
              max: 50, //custom max (as opposed to faceted max)
              min: 0, //custom min (as opposed to faceted min)
              step: 5,
              valueLabelFormat: (value) =>
                value.toLocaleString('en-US', {
                }),
            },
          },
          {
            accessorKey: 'people',
            header: 'People',
            Cell: ({ cell }) =>
              cell.getValue().toLocaleString('en-US', {
              }),
            filterVariant: 'range-slider',
            filterFn: 'betweenInclusive', // default (or between)
            muiTableHeadCellFilterSliderProps: {
              marks: true,
              max: 100, //custom max (as opposed to faceted max)
              min: 0, //custom min (as opposed to faceted min)
              step: 5,
              valueLabelFormat: (value) =>
                value.toLocaleString('en-US', {
                }),
            },
          },
          {
            accessorKey: 'umbrellas',
            header: 'Umbrellas',
            Cell: ({ cell }) =>
              cell.getValue().toLocaleString('en-US', {
              }),
            filterVariant: 'range-slider',
            filterFn: 'betweenInclusive', // default (or between)
            muiTableHeadCellFilterSliderProps: {
              marks: true,
              max: 15, //custom max (as opposed to faceted max)
              min: 0, //custom min (as opposed to faceted min)
              step: 5,
              valueLabelFormat: (value) =>
                value.toLocaleString('en-US', {
                }),
            },
          },
        ],
        [],
  );

  //optionally, you can manage any/all of the table state yourself
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    //do something when the row selection changes
  }, [rowSelection]);

  //Or, optionally, you can get a reference to the underlying table instance
  const tableInstanceRef = useRef(null);

  const someEventHandler = () => {
    //read the table state during an event from the table instance ref
    console.log(tableInstanceRef.current.getState().sorting);
  }

  return (
    <MaterialReactTable 
      columns={columns} 
      data={data} 
      enableColumnOrdering //enable some features
      enablePagination={true} //disable a default feature
      state={{ rowSelection }} //manage your own state, pass it back to the table (optional)
      tableInstanceRef={tableInstanceRef} //get a reference to the underlying table instance (optional)
    />
  );
}
