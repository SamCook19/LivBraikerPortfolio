import React, { Component } from 'react';
import firebase from '../../config/firebase';

const db = firebase.default.firestore()

class OtherMedia extends Component {
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
    .collection( 'OtherMedia' ).doc(`${this.props.data.id}`)
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
        <div className="OtherProjectContainer">
            <div className='ImageContainerOther'>
          
         {
                    
                        this.state.images.map((image, index) => 
                         
                            <OtherMediaImages
                            key={index} 
                            data={image}
                            />
                        )
                }
                {
                    
                    this.state.images.map((image, index) => 
                     
                        <OtherMediaLabel key={index} 
                        data={image}/>
                    )
            }
               
                    
          </div>
          <div className="conceptual-spacer"></div>
    </div>
    )}
}

const OtherMediaLabel = (props) => {
    return (
        <div className="OtherLabelContainer">
            <div className="OtherLabel">
                <img
                src={props.data.label}
                />
            </div>
        </div>
    )
}

const OtherMediaImages = (props) => {
    return (
        <div className="OtherMediaImages">
            <div className="OtherImageContainer">
                <img
                src={props.data.featuredImage}
                />
            </div>
        </div>
    )
}

export default OtherMedia;