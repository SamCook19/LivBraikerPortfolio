import React, { Component } from 'react';
import firebase from '../../config/firebase';
import Carousel from 'react-bootstrap/Carousel';
import Slider from "react-slick";
import RemoveImage from './gallery-delete';
import GalleryEdit from './gallery-edit';

const db = firebase.default.firestore()

class HomeGallery extends Component {
    constructor(props) {
        super(props);
        this.state={
            isLoaded: false,
            pictures: []
        }
    }

    componentDidMount() {
        this.getMyPictures()
    }

    getMyPictures = () => {
        db
        .collection( 'FeaturedGallery' )
        .get()
        .then(docs => {
            if(!docs.empty){
                let allPictures = []
                docs.forEach(function (doc) {
                    const picture = {
                        id: doc.id,
                        ...doc.data()
                    }

                    allPictures.push(picture)
                })

                this.setState({
                    pictures: allPictures
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
            <div className="gallery-container">
                <div className="featured-work">
                    <h1 className="display-1">FEATURED WORK</h1>
                </div>
                <div className='CarouselContainer'>
        <Carousel  id="slide"
        indicators={false}
        fade={false}
        controls={false}
        interval= "2000"
        className='right-side-carousel'>
          
         {
                    
                        this.state.pictures.map((picture, index) => 
                          
                          <Carousel.Item>
                         
                            <GalleryContent
                            key={index} 
                            data={picture}
                            />
                        </Carousel.Item>
                        )
                }
               
                    </Carousel>
                    
                  </div>  
                  <div className="home-carouseledit">
                        <GalleryEdit />
                    </div>
          </div>
        );
    }
}


const GalleryContent = (props) => {
    return (
        <div className="GalleryImg">
            
            <img 
            height= "400px"
            top
            src={props.data.featuredImage}
            alt="Card Image"
            className="GalleryImg"
            />
            <div className='delete'>
            <RemoveImage data={props.data} />
            </div>
            
        </div>
    )
}

export default HomeGallery;
