import React, { Component } from 'react';
import firebase from '../../config/firebase';
import Carousel from 'react-bootstrap/Carousel';
import Slider from "react-slick";
import GalleryContent from './gallerycontent';

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
        // const settings = {
        //     dots: true,
        //     infinite: true,
        //     speed: 500,
        //     slidesToShow: 1,
        //     slidesToScroll: 1
        //   };
        return (
            <div className="gallery-container">
                <div className="featured-work">
                    <h1>Featured Work</h1>
                </div>
                <div className='CarouselContainer'>
        <Carousel  id="slide"
        indicators={true}
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
          </div>
        );
    }
}

export default HomeGallery;
