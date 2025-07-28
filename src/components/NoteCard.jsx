import { useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    CardActions,
    IconButton,
    Button,
    TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

export default function NoteCard({ note, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(note.text);
    const [editColor, setEditColor] = useState(note.color);
    const [editTags, setEditTags] = useState(note.tags.join(", "));

    const handleSave = () => {
        const tagsArray = editTags
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t !== "");
        onUpdate(note.id, editText, editColor, tagsArray);
        setIsEditing(false);
    };

    return (
        <Card
            sx={{
                backgroundColor: note.color,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <CardContent
                sx={{
                    overflow: "hidden",
                    flexGrow: 1,
                }}
            >
                {isEditing ? (
                    <>
                        <TextField
                            multiline
                            fullWidth
                            rows={3}
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Tags"
                            value={editTags}
                            onChange={(e) => setEditTags(e.target.value)}
                            sx={{ mt: 1 }}
                        />
                        <div style={{ marginTop: "10px" }}>
                            <label>Pick color: </label>
                            <input
                                type="color"
                                value={editColor}
                                onChange={(e) => setEditColor(e.target.value)}
                            />
                        </div>
                        <Button
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={handleSave}
                            sx={{ mt: 1 }}
                        >
                            Save
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography
                            variant="body1"
                            sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 4,
                                WebkitBoxOrient: "vertical",
                            }}
                        >
                            {note.text}
                        </Typography>

                        {note.tags.length > 0 && (
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ display: "block", mt: 1 }}
                            >
                                Tags: {note.tags.join(", ")}
                            </Typography>
                        )}

                        {note.createdAt && (
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ mt: 1, display: "block" }}
                            >
                                Created on: {new Date(note.createdAt).toLocaleString()}
                            </Typography>
                        )}
                    </>
                )}
            </CardContent>

            {!isEditing && (
                <CardActions>
                    <IconButton color="primary" onClick={() => setIsEditing(true)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => onDelete(note.id)}>
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            )}
        </Card>
    );
}
