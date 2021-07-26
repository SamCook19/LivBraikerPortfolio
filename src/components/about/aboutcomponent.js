import React, { Component } from 'react';
import firebase from '../../config/firebase';
import AccoladeModal from './edit/addaccolade';
import AboutModal from './edit/editabout';
import parse from 'html-react-parser';
import HeadshotModal from './edit/changeheadshot';

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
                            <div className="headshot-container">
                          <Headshot className="Headshot"
                            key={index}
                            data={headshot}
                          />
                          </div>
                          )
                        })
                        : '' 
                      }
                      <div className="headshot-edit">
                          <HeadshotModal />
                      </div>
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
                      <div className="edit-about"><AboutModal /></div>
                </div>
                <h1 className="display-2">Awards and Accolades</h1>
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
                    <div className="add-accolade">
                      <AccoladeModal />
                    </div>
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
            <h3 className="accolade">{props.data.accolade}</h3>
            <div className="seperator"></div>
            </div>
    )
}

const About = (props) => {
    return (
        <div className="about-container">
                 <div className="about-container">
                    {parse(props.data.About)}
                    
                </div>
        </div>
    )
}

export default AboutComponent;