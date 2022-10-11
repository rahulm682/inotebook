import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    // const state1 = {
    //     name: "Rahul Maurya",
    //     age: 21,
    // }

    // const [state, setState] = useState(state1);

    // const update = () => {
    //     setTimeout(() => {
    //         setState({
    //             name: "Darshit Sorathiya",
    //             age: 22,
    //         });
    //     }, 1000);
    // }

    // const initialNotes = [
    //     {
    //         "_id": "62c444c4e718502e37e8980e2",
    //         "userid": "62c2f588a29d961a7447cec2",
    //         "title": "Title 2",
    //         "description": "Description 2",
    //         "tag": "Tag 2",
    //         "date": "2022-07-05T14:03:48.623Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "62c44691c90617cde0f3f5513",
    //         "userid": "62c2f588a29d961a7447cec2",
    //         "title": "Title 1",
    //         "description": "Description 1",
    //         "tag": "Tag 1",
    //         "date": "2022-07-05T14:11:40.242Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "62c14605637bd3b7632b2a4b6",
    //         "userid": "62c2f588a29d961a7447cec2",
    //         "title": "Title 4",
    //         "description": "Description 4",
    //         "tag": "Tag 4",
    //         "date": "2022-07-05T16:01:26.371Z",
    //         "__v": 0
    //     }, {
    //         "_id": "62c444c4e78502e37e89801e2",
    //         "userid": "62c2f588a29d961a7447cec2",
    //         "title": "Title 2",
    //         "description": "Description 2",
    //         "tag": "Tag 2",
    //         "date": "2022-07-05T14:03:48.623Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "162c4469c90617cde0f3f5513",
    //         "userid": "62c2f588a29d961a7447cec2",
    //         "title": "Title 1",
    //         "description": "Description 1",
    //         "tag": "Tag 1",
    //         "date": "2022-07-05T14:11:40.242Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "62c4605637bd13b7632b2a4b6",
    //         "userid": "62c2f588a29d961a7447cec2",
    //         "title": "Title 4",
    //         "description": "Description 4",
    //         "tag": "Tag 4",
    //         "date": "2022-07-05T16:01:26.371Z",
    //         "__v": 0
    //     }
    // ];

    // const [notes, setNotes] = useState(initialNotes);
    
    const [notes, setNotes] = useState("");

    // fetch All Notes
    const fetchNotes = async () => {
        // Default options are marked with *
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json', // 'Content-Type': 'application/x-www-form-urlencoded',
                'auth-token': localStorage.getItem("auth-token"),
            }
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);
        setNotes(json);
    }

    // addNote 
    const addNote = async ({title, description, tag}) => {
        // const note = {
        //     "_id": "62c4605637bd13b7632b2a4b6",
        //     "userid": "62c2f588a29d961a7447cec2",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "date": "2022-07-05T16:01:26.371Z",
        //     "__v": 0
        // };
        // setNotes(notes.concat(note));

        // Default options are marked with *
        
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'auth-token': localStorage.getItem("auth-token"),
            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });
        const note = await response.json(); // parses JSON response into native JavaScript objects
        console.log(note);
        setNotes(notes.concat(note));
    }

    // Delete Note
    const deleteNote = async (id) => {
        // console.log('id: ', id);
        // setNotes(notes.filter((note)=> id !== note._id));

        // Deleting the note from the database
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("auth-token"),
            },
        });
        const note = await response.json(); // parses JSON response into native JavaScript objects
        console.log(note);
        // removing the note from the state
        setNotes(notes.filter((note) => id !== note._id));
    }

    // Update Note
    const updateNote = async ({_id, title, description, tag}) => {
        // console.log('id: ', _id);
        // // setNotes(notes.filter((note) => _id !== note._id));
        // let newNotes = JSON.parse(JSON.stringify(notes));
        // for (let i = 0; i < newNotes.length; i++) {
        //     if (_id === newNotes[i]._id) {
        //         newNotes[i].title = title;
        //         newNotes[i].description = description;
        //         newNotes[i].tag = tag;
        //         setNotes(newNotes);
        //         break;
        //     }
        // }

        const response = await fetch(`${host}/api/notes/updatenote/${_id}`, {
            method: "PUT",
            headers: {
                "auth-token": localStorage.getItem("auth-token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description, tag }),
        });

        const updatedNote = await response.json();

        // Here notes are constant and thus cannot be directly changed in the state
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let i = 0; i < newNotes.length; i++) {
            if(_id===newNotes[i]._id) {
                newNotes[i].title = title;
                newNotes[i].description = description;
                newNotes[i].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
        console.log(updatedNote);
    }

    return(
        // <NoteContext.Provider value={{state, update}}>
        <NoteContext.Provider value={{notes, setNotes, addNote, deleteNote, updateNote, fetchNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;