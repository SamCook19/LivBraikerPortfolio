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
  
 
  
  export default function AboutModal() {
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
         Edit About
        </button>
        <Modal
          open={open}
          onClose={handleClose}
        >
      <div className='WhoWeAreEdit'>
      <EditAbout />
      </div>
        </Modal>
      </div> ) : null
    );
  }

class EditAbout extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            article: {
                
                About: "",
                
            }
        }
    }

    modules = {
        toolbar: {
            container: [
                [{'header': '1'}, {'header': '2'}, {'font': []}],
                [{size: []}],
                ['bold','italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'},
                    {'indent': '-1'}, {'indent': '+1'}],
                    ['link', 'image'],
                    ['clean'], ['code-block']
            ],
        },
        clipboard: {
            matchvisual: false,
        },
    }

    formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
        'code-block'
    ]


    onChangeArticleContent = (value) => {
        this.setState({
            article: {
                ...this.state.article,
                About: value
            }
        })
    }


    submitEdit = async () => {
        const article = this.state.article
        await db.collection("LivAbout").doc("WHxs0hBsCrSgIOPcNqMp")
            .update(
                article
                )
            
            .catch( err => console.log(err))
            location.reload()
    }

    render() {
        return (
            <Container>
            <Row>
                <Col >
                    <h2 className='SectionTitle'>Edit About</h2>
                    
                   
                </Col>
                <div className='edit-article-container'>
                    <FormGroup className='left-column'>
                        <ReactQuill className='edit-quill'
                            ref={(el) => this.quill = el}
                            value={this.state.article.About}
                            onChange={(e) => this.onChangeArticleContent(e)}
                            theme='snow'
                            modules={this.modules}
                            formats={this.formats}
                        />
            
                        <FormGroup className='edit-status-button'>
                                <Button className='edit-submit'
                                onClick={(e) => this.submitEdit()}>
                                    Submit
                                </Button> 
                            </FormGroup>
                        </FormGroup>
               
                </div>
            </Row>
            </Container>
        );
    }
}
