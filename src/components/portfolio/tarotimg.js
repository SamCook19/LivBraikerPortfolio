import React, { Component } from 'react';
import firebase from '../../config/firebase';
import Carousel from 'react-bootstrap/Carousel';

const db = firebase.default.firestore()

class TarotImg extends Component {
    constructor(props) {
        super(props);
        this.state={
            isLoaded: false,
            images: [],
        }
    }

componentDidMount() {
    this.getMyImages()
}

getMyImages = () => {
    db
    .collection( 'Tarot' ).doc(`${this.props.data.id}`)
    .collection('images')
    .get()
    .then(docs => {
        if(!docs.empty) {
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
                this.setState({
                    isLoaded: true
                })
            })
        }
    })
    
}

render() {
    return (
        <div className="ConceptualProjectContainer">
            <div className='TarotContainer'>
        
          
         {
                    
                        this.state.images.map((image, index) => 
                          
                          
                         
                            <TarotImages
                            key={index} 
                            data={image}
                            />
                        
                        )
                }
               
                    
                    
          </div>
          <div className="Tarot-spacer"></div>
    </div>
    )}
}

const TarotImages = (props) => {
    return (
        <div className="TarotSlideshow">
            <div className="TarotGalleryContainer">
                <img
                src={props.data.featuredImage}
                />
            </div>
        </div>
    )
}

export default TarotImg;