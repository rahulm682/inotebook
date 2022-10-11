import React from 'react';
import Notes from './Notes';


const Home = ({showAlert}) => {
  // fetching the context data using useContext
  // const state1 = useContext(NoteContext);

  //   useEffect(() => {
  //     state1.update();
  //   });

  return (
    <div>
      <Notes showAlert={ showAlert }/>
    </div>
  )
}

export default Home
