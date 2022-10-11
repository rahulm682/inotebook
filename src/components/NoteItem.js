import React, {useContext } from 'react'
import NoteContext from '../context/noteContext';

function NoteItem(props) {
    const { deleteNote } = useContext(NoteContext);
    // Here the updateNote functionn is passed as a props from parent
    const { note, updateNoteShowModal, showAlert } = props;
    const {_id, title, description, tag } = note;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description} </p>
                    <p>{tag}</p>
                    
                    {/* after deleting the note show the alert */}
                    <i className="fa-solid fa-trash-can mx-2" onClick={() => { deleteNote(_id); showAlert("Deleted Successfully", "success") }}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={() => updateNoteShowModal(note)}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem