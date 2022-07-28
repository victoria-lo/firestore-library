import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { db } from "./config.js";
import { collection, query, onSnapshot, doc, deleteDoc } from "firebase/firestore";

export default function Books() {
  const [rows, setRows] = useState([]);
  const getBooks = () => {
    const q = query(collection(db, "books"));
    onSnapshot(q, (querySnapshot) => {
      const rows = [];
      querySnapshot.forEach((doc) => {
        rows.push(doc.data())
      });
      setRows(rows);
    });
  };

  useEffect(() => {
    getBooks();
  },[]);

  const deleteBook = async (title) =>{
    await deleteDoc(doc(db, "books", title));
    alert(title+" has been successfully deleted.")
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>No.</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Author</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Quantity</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.author}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>
                <Button variant="outlined" color="error" onClick={()=>deleteBook(row.title)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
