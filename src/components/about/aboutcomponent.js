import React, { Component } from 'react';
import firebase from '../../config/firebase';

const db = firebase.default.firestore()


class AboutComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            isLoaded: false,
            pictures: [],
            headshot: [],
            about: [],
        }
    }

    componentDidMount() {
        this.getMyAccolades()
        this.getMyHeadshot()
        this.getMyAbout()
    }

    getMyAccolades = () => {
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

    getMyHeadshot = () => {
        db
        .collection( 'Headshot' )
        .get()
        .then(docs => {
            if(!docs.empty){
                let allHeadshot = []
                docs.forEach(function (doc) {
                    const picture = {
                        id: doc.id,
                        ...doc.data()
                    }

                    allHeadshot.push(picture)
                })

                this.setState({
                    headshot: allHeadshot
                })
            }
        })
    }

    getMyAbout = () => {
        db
        .collection( 'LivAbout' )
        .get()
        .then(docs => {
            if(!docs.empty){
                let About = []
                docs.forEach(function (doc) {
                    const about = {
                        id: doc.id,
                        ...doc.data()
                    }

                    About.push(about)
                })

                this.setState({
                    about: About
                })
            }
        })
    }

    render() {
        return (
            <div className="about-container">
                <div className="headshot">
                {
                      this.state.isLoaded ?
                        this.state.headshot.map((headshot, index) => {
                          return(
                            <div>
                          <Headshot className="Headshot"
                            key={index}
                            data={headshot}
                          />
                          </div>
                          )
                        })
                        : '' 
                      }
                </div>
                <div className="about">
                {
                      this.state.isLoaded ?
                        this.state.about.map((about, index) => {
                          return(
                            <div>
                          <About className="About"
                            key={index}
                            data={about}
                          />
                          </div>
                          )
                        })
                        : '' 
                      }
                </div>
                <div className="accolades">
                {
                      this.state.isLoaded ?
                        this.state.pictures.map((pictures, index) => {
                          return(
                            <div>
                          <Accolades className="Accolades"
                            key={index}
                            data={pictures}
                          />
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

const Headshot = (props) => {
    return (
            <div className="headshot">
                <img
                src={props.data.headshot}
                />
            </div>
        
    )
}

const Accolades = (props) => {
    return (
        <div className="accoladeContainer">
            {props.data.accolade}
            </div>
    )
}

const About = (props) => {
    return (
        <div className="about-container">
                 <div className="about-container">
                    {props.data.About}
                </div>
        </div>
    )
}

export default AboutComponent;