import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export const createNote = (noteData) => {
  const usersCollection = firestore().collection('Notes');
  if (!noteData.title || !noteData.description || !noteData.email){
    console.log('Note is empty');
  }else{
    firestore()
          .collection('Notes').add(noteData)
          .then(() => {
            console.log('Note is added!');
          })
    }
}

export const getCollectionData = async () => {
  const notesArray = [];
     await firestore().collection('Notes')
      .get()
      .then(notesCollection => {
        console.log('Total users: ', notesCollection.size);
        notesCollection.forEach(documentSnapshot => {
          const data = documentSnapshot.data();
          data.id = documentSnapshot.id;
          // console.log("user Data : " , documentSnapshot.id, documentSnapshot.data())
          // console.log("new Data : ", data)
          notesArray.push(data);
        });
        
      })
      return notesArray     
}


 //update firestore
export const updateNote = (docId, updatedData) => {
  
   firestore()
   .collection("Notes")
   .doc(docId)
   .update(updatedData)
   .then(() => {
    console.log('Note is updated!');
  })
    
}