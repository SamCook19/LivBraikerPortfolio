import React, { Component } from 'react';
import firebase from '../../config/firebase';
import Carousel from 'react-bootstrap/Carousel';
import parse from 'html-react-parser';
import ConceptualSlideshow from './conceptualslideshow';

const db = firebase.default.firestore()

class ConceptualProjects extends Component {
    constructor(props) {
        super(props);
        this.state={
            isLoaded: false,
            info: [],
            images: [],
        }
    }

    componentDidMount() {
        this.getMyInfo()
    }


    getMyInfo = () => {
        db
        .collection( 'Conceptual' )
        .get()
        .then(docs => {
            if(!docs.empty){
                let allInfo = []
                docs.forEach(function (doc) {
                    const info = {
                        id: doc.id,
                        ...doc.data()
                    }

                    allInfo.push(info)
                })

                this.setState({
                    info: allInfo
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
            <div className="ConceptualProjectContainer">
                <div>
                {
                    this.state.isLoaded ?
                    this.state.info.map((info, index) => {
                        return(
                            <div>
                            <div>
                            <ConceptualContent className="ConceptualContent"
                            key={index}
                            data={info}
                            />
                            </div>
                            <div>
                            <ConceptualSlideshow className="ConceptualSlideshow"
                            key={index}
                            data={info}/>
                            </div>
                            </div>
                        )
                    })
                    : ''
                }
                
                 </div>
                 
                
            </div>
        );
    }
}


const ConceptualContent = (props) => {
    return (
        <div className="ConceptualContainer">
        <div className= "ConceptualTitle">
            {parse(props.data.title)}
            </div>
            <div className="ConceptualSubtitle">
                {parse(props.data.subtitle)}
            </div>
        </div>
        
    )
}


export default ConceptualProjects;