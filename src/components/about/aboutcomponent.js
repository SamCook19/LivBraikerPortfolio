import React, { Component } from 'react';
import firebase from '../../config/firebase';
import Carousel from 'react-bootstrap/Carousel'
import AboutContent from './aboutcontent';

const db = firebase.default.firestore()


class AboutComponent extends Component {
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
        .collection( 'About' )
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
            <div className="about-container">
                <div className="about">
                {
                      this.state.isLoaded ?
                        this.state.pictures.map((pictures, index) => {
                          return(
                          <AboutContent className='AboutContent'
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

export default AboutComponent;