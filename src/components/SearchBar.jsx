import TextField from "@mui/material/TextField";

export default function SearchBar({ search, setSearch }) {
    return (
        <div style={{ marginBottom: "1rem" }}>
            <TextField
                fullWidth
                label="Search Notes"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    );
}
