
import React, { Component } from 'react';
import {Container, Row, Col, FormGroup, Label, Input, Button} from 'reactstrap';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import firebase from "firebase";
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../../contexts/AuthContext';

const db = firebase.default.firestore()
const storageRef = firebase.storage()

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  
 
  
  export default function AccoladeModal() {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
  
    const { currentUser } = useAuth();
  
    return (
        currentUser ? (
      <div>
        <button type="button" onClick={handleOpen}>
          Add Accolade
        </button>
        <Modal
          open={open}
          onClose={handleClose}
        >
      <div className='WhoWeAreEdit'>
      <AddAccolade />
      </div>
        </Modal>
      </div> ) : null
    );
  }

class AddAccolade extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            article: {
                accolade: ''
            }
        }
    }

    

    onChangeArticleContent = (value) => {
        this.setState({
            article: {
                ...this.state.article,
                accolade: value
            }
        })
    }


    submitAccolade = async () => {
        const accolade = this.state.article
        await db.collection("About")
            .add(
                accolade
                )
            
            .catch( err => console.log(err))
            location.reload()
    }

    


    render() {
        return (
            <Container>
            <Row>
                <Col >
                    <h2 className='SectionTitle'>Add Accolade</h2>
                    <FormGroup className='TitleForm'>
                        <Label className='TitleLabel'>
                            <span style={{color: "white"}}>Title</span>
                        </Label>
                        <input type ='text' className='editArticleTitle' placeholder=''
                        onChange={(e) => this.onChangeArticleContent(e.target.value)}
                        value={this.state.article.accolade}/>
                    </FormGroup>
                   
                </Col>
                <div className='edit-article-container'>

                        <FormGroup className='edit-status-button'>
                                <Button className='edit-submit'
                                onClick={(e) => this.submitAccolade()}>
                                    Submit
                                </Button> 
                            </FormGroup>

                
                </div>
            </Row>
            </Container>
        );
    }
}
