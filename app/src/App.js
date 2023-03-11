import "./App.css";
import { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import Editor from "react-simple-code-editor";
import TeamJSON from "./assets/example/team.json";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/themes/prism.css";

function App() {
  const [code, setCode] = useState(
    "// load a JSON or type in your JSON here:\n\n"
  );
  const [result, setResult] = useState("// result will go here: \n\n");

  return (
    <div className="App">
      <div className="Main">
        <Typography variant="h2" gutterBottom>
          XPath for JSON
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="query-input"
              fullWidth
              label="XPath-like Expression"
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <div style={{ height: 120 }}>
              <Typography variant="h4" gutterBottom>
                Input JSON
              </Typography>
              <Button
                variant="contained"
                component="label"
                style={{ marginRight: 8 }}
              >
                Upload File
                <input type="file" accept=".json" hidden />
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setCode(JSON.stringify(TeamJSON, null, 4));
                }}
              >
                Load a sample JSON
              </Button>
            </div>
            <div style={{ border: "solid 1px #555" }}>
              <Editor
                value={code}
                onValueChange={(code) => setCode(code)}
                highlight={(code) => highlight(code, languages.js)}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 12,
                }}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div style={{ height: 120 }}>
              <Typography variant="h4" gutterBottom>
                Output Result
              </Typography>
            </div>
            <div style={{ border: "solid 1px #555" }}>
              <Editor
                value={result}
                onValueChange={(result) => setResult(result)}
                highlight={(result) => highlight(result, languages.js)}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 12,
                }}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
