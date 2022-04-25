import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';

const colVis = (id: any, arr: any) =>
  arr.some((e: any) => e.id === id && e.showByDefault === true);

function filterTableRows(rows: any) {
  return rows.data.map((row: any) =>
    Object.fromEntries(
      Object.entries(row).filter(([key, value]) => colVis(key, rows.header))
    )
  );
}

function descendingComparator(a: any, b: any, orderBy: any) {

  if (parseInt(b[orderBy]) < parseInt(a[orderBy])) {
    return -1;
  }
  if (parseInt(b[orderBy]) > parseInt(a[orderBy])) {
    return 1;
  }
  return 0;
}

function getComparator(order: any, orderBy: any) {
  return order === 'desc'
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}
interface enhancedProps {
  order: any;
  orderBy: any;
  headCells: any;
  onRequestSort: any;
}
function EnhancedTableHead({
  order,
  orderBy,
  headCells,
  onRequestSort,
}: enhancedProps) {
  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell: any) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              display: {
                xs: headCell.showOnMobile ? 'table-cell' : 'none',
                sm: headCell.showByDefault ? 'table-cell' : 'none',
              },
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

function StandingsTable({ rows }: any) {
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('points');
  // const [page, setPage] = React.useState(0);
  const [numPodium, setNumPodium] = React.useState(3);
  const [dense, setDense] = React.useState(false);
  // const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeDense = (event: any) => {
    setDense(event.target.checked);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* // <EnhancedTableToolbar />
        <Podium/> */}
        <TableContainer>
          <Table
            sx={{ minWidth: 330 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              headCells={rows.header}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {filterTableRows(rows)
                .sort(getComparator(order, orderBy))
                .map((row: any, index: any) => {
                  const labelId = `${index}`;
                  return (
                    <TableRow hover tabIndex={-1} key={row.team}>
                      {Object.keys(row).map((e) => (
                        <TableCell
                          align={
                            rows.header.some(
                              (x: any) => x.id === e && x.numeric
                            )
                              ? 'right'
                              : 'left'
                          }
                          sx={{
                            display: {
                              xs: rows.header.some(
                                (x: any) => x.id === e && x.showOnMobile
                              )
                                ? 'table-cell'
                                : 'none',
                              sm: rows.header.some(
                                (x: any) => x.id === e && x.showByDefault
                              )
                                ? 'table-cell'
                                : 'none',
                            },
                          }}
                          key={row[e] + Math.random()}
                        >
                          {row[e]}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <FormControlLabel
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
          label="Kompakt tabell"
          control={<Switch checked={dense} onChange={handleChangeDense} />}
        />
      </Paper>
    </Box>
  );
}

export default StandingsTable;
