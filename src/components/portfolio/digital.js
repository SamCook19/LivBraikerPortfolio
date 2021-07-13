import React, { Component } from 'react';
import firebase from '../../config/firebase';

const db = firebase.default.firestore()

class Digital extends Component {
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
        .collection( 'Digital' )
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
            <div className="DigitalGalleryContainer">
                {
                    this.state.isLoaded ?
                    this.state.images.map((image, index) => {
                        return(
                            <DigitalContent className="digitalcontent"
                            key={index}
                            data={image}
                            />
                        )
                    })
                    : ''
                }
                
            </div>
        );
    }
}

const DigitalContent = (props) => {
    return (
        <div className="ImageContainer">
        <div className="DigitalImage">
            <img
            src={props.data.featuredImage}
            alt="Card Image"
            className="digital-img"
            />
        </div>
        </div>
    )
}

export default Digital;