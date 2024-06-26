import React, { useMemo, useState, useEffect } from 'react';
import classes from './Table.module.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUsers } from '../../store/action-creator/fetchUsers';
import { MyTableProps, Order } from '../../types/table';
import TableSortLabel from '@mui/material/TableSortLabel';

export default function BasicTable() {
  const {users, isLoading, error} = useAppSelector(state => state.usersReducer);
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [orderBy, setOrderBy] = React.useState<keyof MyTableProps>('id');  
  const [order, setOrder] = React.useState<Order>('asc');
 
  useEffect(()=> {
    dispatch(fetchUsers())
  }, [])

  const searchRows = useMemo(()=>{
    return users.filter(user=> user.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, users]);

  const visibleRows = useMemo(()=>{
    return stableSort(searchRows, getComparator(order, orderBy))
  }, [searchRows, order, orderBy])

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof MyTableProps,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property: keyof MyTableProps) => (event: React.MouseEvent<unknown>) => { 
    handleRequestSort(event, property)
  };

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
  ) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  return (
    <>
      { 
      isLoading ?  
        <h2>Загрузка...</h2> : 
      error ? 
        <h2>{error}</h2> 
      :
      <section className={classes.users__table}>
        <div className={classes.users__searchWrapper}>
          <input className={classes.users__search} placeholder='name' value = {searchQuery} onChange={e => setSearchQuery(e.target.value)} type='text'></input>
          <span className={classes.users__searchIkon}></span>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align='left'>
                  <TableSortLabel active={orderBy === 'id'}  direction={orderBy === 'id' ? order : 'asc'} className={classes.usersTable__head} onClick={createSortHandler('id')}>id</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel active={orderBy === 'name'}  direction={orderBy === 'name' ? order : 'asc'} className={classes.usersTable__head} onClick={createSortHandler('name')}>name</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel active={orderBy === 'username'}  direction={orderBy === 'username' ? order : 'asc'} className={classes.usersTable__head} onClick={createSortHandler('username')}>username</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel active={orderBy === 'email'}  direction={orderBy === 'email' ? order : 'asc'} className={classes.usersTable__head} onClick={createSortHandler('email')}>email</TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left" component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.username}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
      }
    </>
  );
}