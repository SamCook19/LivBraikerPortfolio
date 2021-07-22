import React, { Component } from 'react';
import firebase from '../../config/firebase';
import Carousel from 'react-bootstrap/Carousel';
import GalleryAddition from './edit/add-new-conceptual';

const db = firebase.default.firestore()

class ConceptualSlideshow extends Component {
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
    .collection( 'Conceptual' ).doc(`${this.props.data.id}`)
    .collection('Slideshow')
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
            <div className='CarouselContainer'>
        <Carousel  id="slide"
        indicators={true}
        fade={false}
        controls={true}
        
        interval = {null}
        className='right-side-carousel'>
          
         {
                    
                        this.state.images.map((image, index) => 
                          
                          <Carousel.Item>
                         
                            <ConceptualImages
                            key={index} 
                            data={image}
                            />
                        </Carousel.Item>
                        )
                }
               
                    </Carousel>
                    
          </div>
          <div>
              <GalleryAddition data={this.props.data}/>
          </div>
          <div className="conceptual-spacer"></div>
    </div>
    )}
}

const ConceptualImages = (props) => {
    return (
        <div className="ConceptualSlideshow">
            <div className="ConceptualGalleryContainer">
                <img
                src={props.data.featuredImage}
                />
            </div>
        </div>
    )
}

export default ConceptualSlideshow;