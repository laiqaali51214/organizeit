import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import NotesList from "../components/NotesList";
import NoteForm from "../components/NoteForm";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

export default function Home() {
    // Load notes directly from localStorage during initialization
    const [notes, setNotes] = useState(() => {
        const savedNotes = localStorage.getItem("notes");
        return savedNotes ? JSON.parse(savedNotes) : [];
    });

    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    // Save notes to localStorage whenever notes state changes
    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    // Add a new note with createdAt timestamp
    const addNote = (text, color, tags) => {
        const newNote = {
            id: Date.now(),
            text,
            color,
            tags,
            createdAt: new Date().toISOString(), // Store timestamp
        };
        setNotes([newNote, ...notes]);
        setOpen(false);
    };

    // Delete a note
    const deleteNote = (id) => {
        setNotes(notes.filter((note) => note.id !== id));
    };

    // Edit/update a note
    const updateNote = (id, updatedText, updatedColor, updatedTags) => {
        setNotes(
            notes.map((note) =>
                note.id === id
                    ? { ...note, text: updatedText, color: updatedColor, tags: updatedTags }
                    : note
            )
        );
    };

    // Filter notes by search input
    const filteredNotes = notes.filter((note) =>
        note.text.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <Navbar />

            <div style={{ padding: "1rem", maxWidth: "900px", margin: "0 auto" }}>
                <SearchBar search={search} setSearch={setSearch} />

                <NotesList
                    notes={filteredNotes}
                    onDelete={deleteNote}
                    onUpdate={updateNote}
                />
            </div>

            {/* Floating "+" Button */}
            <Fab
                color="primary"
                sx={{ position: "fixed", bottom: 24, right: 24 }}
                onClick={() => setOpen(true)}
            >
                <AddIcon />
            </Fab>

            {/* Dialog to add new note */}
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Add a New Note</DialogTitle>
                <DialogContent>
                    <NoteForm onAdd={addNote} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
