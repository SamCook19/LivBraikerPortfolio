import React, { Component } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import firebase from '../../config/firebase';
import GalleryEdit from './edit/digital-edit';


const db = firebase.default.firestore()

function RemoveImage (props) {
    const db = firebase.default.firestore()

async function removeImage() {
    await db.collection("Traditional").doc(`${props.data.id}`)
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

class Traditional extends Component {
    constructor(props) {
        super(props);
        this.state={
            isLoaded:false,
            images: []
        }
    }

    componentDidMount() {
        this.getMyImages()
    }

    getMyImages = () => {
        db
        .collection( 'Traditional' )
        .get()
        .then(docs => {
            if(!docs.empty){
                let allImages = []
                docs.forEach(function (doc) {
                    const image = {
                        id: doc.id,
                        ...doc.data()
                    }

                    allImages.push(image)
                })

                this.setState({
                    images: allImages
                }, () => {
                    this.setState ({
                        isLoaded: true
                    })
                })
              }
            })
          }

    render() {
        return (
            <div className="TraditionalGalleryContainer">
                {
                    this.state.isLoaded ?
                    this.state.images.map((image, index) => {
                        return(
                            <TraditionalContent className="Traditionalcontent"
                            key={index}
                            data={image}
                            />
                        )
                    })
                    : ''
                }
                <div className="edit">
                    <GalleryEdit />
                </div>
            </div>
        );
    }
}

const TraditionalContent = (props) => {
    return (
        <div className="ImageContainer">
        <div className="TraditionalImage">
            <img
            src={props.data.featuredImage}
            alt="Card Image"
            className="Traditional-img"
            />
        </div>
        <div className='article-delete'>
            <RemoveImage data={props.data} />
            </div>
        </div>
    )
}

export default Traditional;