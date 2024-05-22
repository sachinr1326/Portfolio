import React, { useState } from 'react'
import "./SendMessageForm.css"
import FormInputChange from "./Utils/FormInputChange"
import FormValidation from "./Utils/FormValidation"
import { useToast } from './ToastContext';
function SendMessageForm(props) {
   const {showToast} =useToast();

    const [errors, setErrors] = useState({});
    const [buttondisable, setbuttondisable] = useState({
      disable: false,
      text: "Continue",
    });
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  
    const handleInputChange = (e) => {
      FormInputChange(e, formData, setFormData, errors, setErrors);
      
    };
  
 
    
  const handleSubmit = (e) => {
    e.preventDefault();

    if (FormValidation(formData, {}, setErrors)) {
      setbuttondisable({
        ...buttondisable,
        disable: true,
        text: "please wait...",
      });
console.log(formData)
      } else {
        // toast.info("Verify your mobile number");
        showToast("Info","All fields are reuired*")
      }
    
  };
  
  return (
    <div className='sachin-send-message-form'>
         <div className="section-1">
            <h4 className="title">
              {props.title}
              <span className="color-text ms-1">{props.color_title}</span>
            </h4>
            <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <input
                type="text"
                name="name"
                placeholder="Name*"
                className={`form-control ${errors.name && "is-invalid"}`}
                aria-describedby="validationename"
                value={formData.name}
                onChange={handleInputChange}
              />
               <div id="validationename" className="invalid-feedback">
            {errors.name}
          </div>
            </div>
            <div class="mb-3">
              <input
                type="email"
                name="email"
                className={`form-control ${errors.email && "is-invalid"}`}
                aria-describedby="validationeemail"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email*"
              />
                <div id="validationeemail" className="invalid-feedback">
            {errors.email}
          </div>
            </div>
            <div class="mb-3">
              <input
                type="phone"
                name="phone"
                className={`form-control ${errors.phone && "is-invalid"}`}
                aria-describedby="validationephone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number*"
              />
               <div id="validationephone" className="invalid-feedback">
            {errors.phone}
          </div>
            </div>
            <div class="mb-3">
              <input
                type="text"
                name="subject"
                className={`form-control ${errors.subject && "is-invalid"}`}
                aria-describedby="validationesubject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Subject*"
              />
               <div id="validationesubjecct" className="invalid-feedback">
            {errors.subject}
          </div>
            </div>
            <div class="mb-5">
              <textarea
                name="message"
                className={`form-control ${errors.message && "is-invalid"}`}
                aria-describedby="validationemessage"
                value={formData.message}
                onChange={handleInputChange}
                rows="8"
                placeholder="Type your Message*"
              ></textarea>
               <div id="validationmessage" className="invalid-feedback">
            {errors.message}
          </div>
            </div>
            <div class="mb-3 text-center">
                <button className="send-msg-btn" type='submit'>Send Message</button>
</div>
</form>
          </div>
    </div>
  )
}

export default SendMessageForm
