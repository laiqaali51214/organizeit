import Grid from "@mui/material/Grid";
import NoteCard from "./NoteCard";
import Typography from "@mui/material/Typography";

export default function NotesList({ notes, onDelete, onUpdate }) {
    if (notes.length === 0) {
        return (
            <Typography variant="body1" color="text.secondary">
                No notes yet.
            </Typography>
        );
    }

    return (
        <Grid container spacing={2}>
            {notes.map((note) => (
                <Grid item xs={12} sm={6} md={4} key={note.id}>
                    <NoteCard note={note} onDelete={onDelete} onUpdate={onUpdate} />
                </Grid>
            ))}
        </Grid>
    );
}
