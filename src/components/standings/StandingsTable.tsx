import React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Podium from './Podium';

const colVis = (id, arr) =>
  arr.some((e) => e.id === id && e.showByDefault === true);

function filterTableRows(rows) {
  return rows.data.map((row) =>
    Object.fromEntries(
      Object.entries(row).filter(([key, value]) => colVis(key, rows.header))
    )
  );
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead({ order, orderBy, headCells, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell align="center" padding="checkbox">
          {' '}
          #{' '}
        </TableCell>
        {headCells.slice(1).map((headCell) => (
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

function StandingsTable({ rows }) {
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('totPoints');
  // const [page, setPage] = React.useState(0);
  const [numPodium, setNumPodium] = React.useState(3);
  const [dense, setDense] = React.useState(false);
  // const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* // <EnhancedTableToolbar />
        <Podium/> */}
        <TableContainer>
          <Table
            sx={{ minWidth: 500 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              headCells={rows.header}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {filterTableRows(rows)
                .sort(getComparator(order, orderBy))
                .map((row, index) => {
                  const labelId = `${index}`;
                  return (
                    <TableRow hover tabIndex={-1} key={row.team}>
                      <TableCell padding="checkbox" align="center">
                        {row.placement}
                      </TableCell>
                      {Object.keys(row)
                        .slice(1)
                        .map((e) => (
                          <TableCell
                            align={
                              rows.header.some((x) => x.id === e && x.numeric)
                                ? 'right'
                                : 'left'
                            }
                            sx={{
                              display: {
                                xs: rows.header.some(
                                  (x) => x.id === e && x.showOnMobile
                                )
                                  ? 'table-cell'
                                  : 'none',
                                sm: rows.header.some(
                                  (x) => x.id === e && x.showByDefault
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
