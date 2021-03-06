import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import * as firebase from 'firebase';

export default function RemoveImage (props)  {

const db = firebase.default.firestore()

async function removeImage() {
    await db.collection("FeaturedGallery").doc(`${props.data.id}`)
        .delete()
        
            .catch( err => console.log(err))
            location.reload()
}

  const { currentUser } = useAuth();

  return (
    currentUser ? (
        <button onClick={() => removeImage(props.data.id)}>Delete Image</button>
        ): null 

  );
}