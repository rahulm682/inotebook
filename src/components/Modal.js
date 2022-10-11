import React from 'react'

const Modal = React.forwardRef((props, ref) => {
    const {note, handleChange, handleUpdateClick} = props;
  return (
      <>{/* <!-- Button trigger modal d-none==>display: none --> */}
          <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}></button>

          {/* <!-- Modal --> */}
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title" id="editNote">Edit Note</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                          <form>
                              <div className="mb-3">
                                  <label htmlFor="title" className="form-label">Title</label>
                                  <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={handleChange} minLength={5} />
                              </div>
                              <div className="mb-3">
                                  <label htmlFor="description" className="form-label">Description</label>
                                  <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={handleChange} minLength={5} />
                              </div>
                              <div className="mb-3">
                                  <label htmlFor="tag" className="form-label">Tag</label>
                                  <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleChange} minLength={3} />
                              </div>
                          </form>
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button disabled={note.title.length < 5 || note.description.length < 5 || note.tag.length < 3} type="button" className="btn btn-primary" onClick={() => handleUpdateClick(note)}>Update Note</button>
                      </div>
                  </div>
              </div>
          </div></>
  )
})

export default Modal