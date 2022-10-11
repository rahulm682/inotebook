import React, { useContext, useEffect, useState, useRef } from 'react'
import NoteContext from '../context/noteContext';
import AddNote from './AddNote';
import Modal from './Modal';
import NoteItem from './NoteItem';
import { useNavigate } from "react-router-dom";


function Notes({showAlert}) {
    let navigate = useNavigate();

    // const host = "http://localhost:5000";
    // fetching the context data using useContext
    const contextData = useContext(NoteContext);
    const { notes, fetchNotes, updateNote } = contextData;

    // by using [] it works as componentDidMount i.e. render only one time
    // fetching all the notes 
    useEffect(() => {
        if (!localStorage.getItem("auth-token")) {
            navigate("/login")
        } else {
            fetchNotes();
        }
        // eslint-disable-next-line
    }, [])

    const [note, setNote] = useState({ _id: " ", title: " ", description: " ", tag: " " });

    // saving the note into the current note
    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const ref = useRef(null);

    const updateNoteShowModal = (currentNote) => {
        // console.log(currentNote);
        // setting the current note as the note to be updated
        setNote(currentNote);
        // calling the click event of the button using the reference (useRef)
        // toggle the behaviour of the modal
        ref.current.click();
    }

    const handleUpdateClick = async (note) => {
        // const { title, description, tag } = note;
        // const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        //     method: "PUT",
        //     headers: {
        //         "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjMmY1ODhhMjlkOTYxYTc0NDdjZWMyIn0sImlhdCI6MTY1NzAyNDE1NX0.bmm20kkK41JK6ynbu_8rZgjvHH_kEXe-0Zf75SoAIxc",
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ title, description, tag }),
        // });

        // const updatedNote = await response.json();
        // console.log(updatedNote);
        // // for refreshing the page
        // setNote(note);

        updateNote(note);
        // toggle the behaviour or close the modal
        ref.current.click();

        // alert for updation
        showAlert("Updated Successfully", "success");
    }

    return (
        <>
            <AddNote showAlert={showAlert} />

            <Modal note={note} ref={ref} handleChange={handleChange} handleUpdateClick={handleUpdateClick} />

            <div className="row my-3">
                <h3>Your Notes</h3>
                <div className="container mx-2">
                    {notes.length===0 && "No Notes to Display"}
                </div>
                {notes && notes.map((note) => {
                    return <NoteItem key={note._id} updateNoteShowModal={updateNoteShowModal} note={note} showAlert={showAlert} />
                })}
            </div>
        </>
    )
}

export default Notes;