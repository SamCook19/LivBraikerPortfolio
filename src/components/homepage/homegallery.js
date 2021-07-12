import React, { Component } from 'react';
import firebase from '../../config/firebase';
import Carousel from 'react-bootstrap/Carousel'
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
        return (
            <div className="gallery-container">
                <div className="featured-work">
                    <h1>Featured Work</h1>
                </div>
                <div className="gallery">
                {
                      this.state.isLoaded ?
                        this.state.pictures.map((pictures, index) => {
                          return(
                          <GalleryContent className='whoweare'
                            key={index}
                            data={pictures}
                          />
                          )
                        })
                        : '' 
                      }
                    
                </div>
            </div>
        );
    }
}

export default HomeGallery;