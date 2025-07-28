import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function NoteForm({ onAdd }) {
    const [text, setText] = useState("");
    const [color, setColor] = useState("#ffffff");
    const [tags, setTags] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        const tagsArray = tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "");
        onAdd(text, color, tagsArray);
        setText("");
        setColor("#ffffff");
        setTags("");
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ marginBottom: "1.5rem", display: "grid", gap: "0.5rem" }}
        >
            <TextField
                label="Write a note"
                multiline
                rows={3}
                fullWidth
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <TextField
                label="Tags (comma separated)"
                fullWidth
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />
            <div>
                <label style={{ marginRight: "10px" }}>Pick color: </label>
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
            </div>
            <Button type="submit" variant="contained">
                Add Note
            </Button>
        </Box>
    );
}
