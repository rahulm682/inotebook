import React, { useState, useContext } from 'react'
import NoteContext from '../context/noteContext';

function AddNote({showAlert}) {
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    // fetching the context data using useContext
    const contextData = useContext(NoteContext);
    const { addNote } = contextData;

    const handleChange = (e) => {
        setNote({...note, [e.target.name]:e.target.value});
    }

    const handleClick = (e) => {
        e.preventDefault();
        // console.log("Adding note");
        addNote(note);
        showAlert("Added Successfully", "success");
        setNote({ title: "", description: "", tag: "" });
    }
  return (
      <div className="container my-2">
          <h2>Add Notes</h2>
          <form>
              <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" name="title" onChange={handleChange} value={note.title} minLength={5} />
              </div>
              <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="description" name="description" onChange={handleChange} value={note.description} minLength={5} />
              </div>
              <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="tag" name="tag" onChange={handleChange} value={note.tag} minLength={3} />
              </div>
              <button disabled={note.title.length<5 || note.description.length<5 || note.tag.length<3} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
          </form>
      </div>
  )
}

export default AddNote