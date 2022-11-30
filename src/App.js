import { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  FormGroup,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";

import * as xlxs from "xlsx";

function App() {
  const [file, setFile] = useState(null);

  const [data, setData] = useState(null);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = (e) => {
        setFile(e.target.result);
      };
    } else {
      alert("Please Select Your File!");
    }
  };

  const handleSubmit = () => {
    if (file !== null) {
      const workbook = xlxs.read(file, { type: "buffer" });
      const workSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[workSheetName];
      const sheetData = xlxs.utils.sheet_to_json(worksheet);
      setData(sheetData);
    } else {
      setData(null);
    }
  };


  console.log(data)
  return (
    <div className="App">
      <h1>Import Excel Sheet</h1>
      <FormGroup className="form">
        <input type="file" required onChange={handleChange} />
        <FormControl className="form-control">
          <Button variant="outlined" onClick={handleSubmit}>
            submit
          </Button>
        </FormControl>
      </FormGroup>

      {data === null && <h2>No File Selected!</h2>}
      {data && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => {
              const { id, Name, Email, Number } = item;
              return (
                <TableRow key={id}>
                  <TableCell>{id}</TableCell>
                  <TableCell>{Name}</TableCell>
                  <TableCell>{Email}</TableCell>
                  <TableCell>{Number}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default App;
