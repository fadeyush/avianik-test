import React, { useMemo, useState } from 'react';
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
import { MyTableProps } from '../../types/table';

export default function BasicTable() {
  
  const {users, isLoading, error} = useAppSelector(state => state.usersReducer);
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState<string>('');

 

  React.useEffect(()=> {
    dispatch(fetchUsers())
  }, [])

  
  function createData(
    id: number | string,
    name: string,
    username: string,
    email: string
  ): MyTableProps {
    return {
      id,
      name,
      username,
      email
    };
  }

  const rows = users.map(user=>
    createData(user.id, user.name, user.username, user.email)
  );

  const searchRows = useMemo(()=>{
    return rows.filter(user=> user.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, users]);

  return (
    <>
      { 
      isLoading ?  
        <h2>Загрузка...</h2> : 
      error ? 
        <h2>{error}</h2> 
      :
      <section className={classes.users__table}>
        <div  className={classes.users__searchWrapper}>
          <input className={classes.users__search} placeholder='name' value = {searchQuery} onChange={e => setSearchQuery(e.target.value)} type='text'></input>
          <span className={classes.users__searchIkon}></span>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">id</TableCell>
                <TableCell align="right">name</TableCell>
                <TableCell align="right">username</TableCell>
                <TableCell align="right">email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchRows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.username}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
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