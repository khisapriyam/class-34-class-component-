import axios from 'axios';
import React, { Component } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

export class StudentModal extends Component {

    constructor(props){
        super(props);

        this.state = {
            inputs : {
                name :'',
                cell : '',
                photo : ''
            }
        }
    }

  render() {

    const {show, handleModalHide, type, dataId, student, handleStudentData} = this.props;
    const { name, cell, photo} = this.state.inputs;

    const handleStudentFormSubmit = (e) => {
        e.preventDefault()
        
        axios.post('http://localhost:5050/students', this.state.inputs).then( res => {
            this.setState( (prevState) => ({
                ...prevState,
                inputs : {
                    name : '',
                    cell : '',
                    photo : ''
                }
            }));
            handleModalHide();
        })
    }

    //handleDataDelete
    const handleDataDelete = (id) => {
        try{
            axios.delete(`http://localhost:5050/students/${id}`).then( res => {
                handleModalHide()
            });

        }catch(err){
            console.log(err);
        }
    }
    //handleStudentFormUpdate
    const handleStudentFormUpdate = (e) => {
        e.preventDefault();
        
        try{
            axios.patch(`http://localhost:5050/students/${student.id}`, student).then( res => {
                
                handleModalHide()
            });

        }catch(err){
            console.log(err);
        }

    }

    
    if(type === 'create'){
        return (
            <>
              <Modal show={show} onHide={ handleModalHide } centered>
                  <Modal.Body>
                      <h2>Add new Student</h2>
                      <hr />
                      <Form onSubmit={ handleStudentFormSubmit }>
                          <Form.Group className='my-3'>
                              <Form.Label>Student Name</Form.Label>
                              <Form.Control type='text' value={name} onChange={ e=> this.setState( (prevState) => ({
                                ...prevState, 
                                inputs : {
                                    ...prevState.inputs,
                                    name : e.target.value
                                }
                              }))}></Form.Control>
                          </Form.Group>
                          <Form.Group className='my-3'>
                              <Form.Label>Cell</Form.Label>
                              <Form.Control type='text' value={cell} onChange={ e => this.setState( (prevState) => ({
                                ...prevState,
                                inputs : {
                                    ...prevState.inputs,
                                    cell : e.target.value
                                }

                              }))}></Form.Control>
                          </Form.Group>
                          <Form.Group className='my-3'>
                              <Form.Label>Student Photo</Form.Label>
                              <Form.Control type='text' value={photo} onChange={ e => this.setState( (prevState) => ({
                                ...prevState,
                                inputs : {
                                    ...prevState.inputs,
                                    photo : e.target.value
                                }

                            }))}></Form.Control>
                          </Form.Group>
                          <Form.Group className='my-3'>
                              <Button type='submit'>Add Now</Button>
                          </Form.Group>
                      </Form>
                  </Modal.Body>
              </Modal>
            </>
          )
    }else if(type === 'show'){
        return (
            <>
              <Modal show={show} onHide={ handleModalHide } centered>
                  <Modal.Body>
                      <img src={ student.photo } alt="" />
                      <h2>{student.name}</h2>
                      <h3>{student.cell}</h3>
                  </Modal.Body>
              </Modal>
            </>
          )

    }else if(type === 'alert'){
        return (
            <>
              <Modal show={show} onHide={ handleModalHide } centered>
                  <Modal.Body>
                     <h3>Are you sure?</h3>
                     <div className="alert-btns">
                        <Button variant='success' onClick={ handleModalHide }>Cancel</Button>&nbsp;
                        <Button variant='danger' onClick={ e => handleDataDelete(dataId)}>Delete</Button>
                     </div>
                  </Modal.Body>
              </Modal>
            </>
          )
    }else if(type === 'edit'){
        return (
            <>
              <Modal show={show} onHide={ handleModalHide } centered>
                  <Modal.Body>
                      <h2>Update Student Data</h2>
                      <hr />
                      <Form onSubmit={ handleStudentFormUpdate }>
                          <Form.Group className='my-3'>
                              <Form.Label>Student Name</Form.Label>
                              <Form.Control type='text' value={student.name} onChange={ e=>  handleStudentData({
                                ...student,
                                name : e.target.value
                              })}></Form.Control>
                          </Form.Group>
                          <Form.Group className='my-3'>
                              <Form.Label>Cell</Form.Label>
                              <Form.Control type='text' value={student.cell} onChange={ e => handleStudentData({
                                ...student,
                                cell : e.target.value
                              })}></Form.Control>
                          </Form.Group>
                          <Form.Group className='my-3'>
                              <Form.Label>Student Photo</Form.Label>
                              <Form.Control type='text' value={student.photo} onChange={ e => handleStudentData({
                                ...student,
                                photo : e.target.value
                              })}></Form.Control>
                          </Form.Group>
                          <Form.Group className='my-3'>
                              <Button type='submit'>Add Now</Button>
                          </Form.Group>
                      </Form>
                  </Modal.Body>
              </Modal>
            </>
          )
    }
  }
}

export default StudentModal