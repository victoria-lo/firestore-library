import "./App.css";
import Books from "./Books.jsx";
import { useState } from "react";
import { TextField, Button, Stack, Paper, Container } from "@mui/material";
import { db } from "./config.js";
import { doc, setDoc } from "firebase/firestore";

function App() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [quantity, setQuantity] = useState("");

  const addBook = async () => {
    if (title !== "" && author !== "" && quantity !== "") {
      try {
        await setDoc(doc(db, "books", title), {
          title,
          author,
          quantity,
        });
        setTitle("");
        setAuthor("");
        setQuantity("");
        alert("A new book has been added to the library!");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else alert("Missing fields");
  };

  return (
    <div className="App">
      <h1>Firestore Library</h1>
      <Container
        component={Paper}
        sx={{ marginBottom: "20px", padding: "20px" }}
      >
        <h2 style={{ fontSize: "20px" }}>Add New Book</h2>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            label="Author"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          />
          <TextField
            label="Quantity"
            value={quantity}
            type="number"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
          <Button variant="contained" onClick={addBook}>
            Add Book
          </Button>
        </Stack>
      </Container>
      <Books />
    </div>
  );
}

export default App;
