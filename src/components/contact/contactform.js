import React from 'react';
import emailjs from 'emailjs-com';

export default function ContactForm() { 

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_3st4xuj', 'template_js9evsu', e.target, 'user_VfVWKG6WCJ4vDEdQkClCo')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reload()
  }


  return (
    <div className='ContactForm'>
      <div className='container'>
        <div className='row'>
          <div className='col-12 text-center'>
            <div className='contactForm'>
              <form id='contact-form' onSubmit={sendEmail}>
                {/* Row 1 of form */}
                <div className='row formRow'>
                  <div className='col-6'>
                    <input
                      type='text'
                      name='name'
                      className='name-area'
                      placeholder='Name'
                    ></input>
                  </div>
                  <div className='col-6'>
                    <input
                      type='email'
                      name='email'
                      className='email-area'
                      placeholder='Email address'
                    ></input>
                    
                  </div>
                  <div className='row formRow'>
                  <div className='col-6'>
                    <input
                      type='text'
                      name='subject'
                      className='subject-area'
                      placeholder='Subject'
                    ></input>
                    
                  </div>
                 
                </div>
                </div>
               
                {/* Row 3 of form */}
                <div className='row formRow'>
                  <div className='col'>
                    <textarea className='message-area'
                      rows={3}
                      name='message'
                      placeholder='Message'
                    ></textarea>
                  </div>
                </div>
                <div className='submit-contact'>
                <button className='submit-btn' type='submit'>
                  Submit
                </button>
                </div>
              </form>
              
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
