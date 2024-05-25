import React, { useState } from "react";
import "./SendMessageForm.css";
import FormInputChange from "./Utils/FormInputChange";
import FormValidation from "./Utils/FormValidation";
import { useToast } from "./ToastContext";
function SendMessageForm(props) {
  const { showToast } = useToast();

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
  // Username: "royalsachin2001@gmail.com",
  //   Password: "A8AFEDAAEF5D18BB70DF5402178675C49A09",
  //   Host: "smtp.elasticemail.com",
  //   Port: 2525,


  const handleSubmit = (e) => {
    e.preventDefault();

    if (FormValidation(formData, {}, setErrors)) {
      setbuttondisable({
        ...buttondisable,
        disable: true,
        text: "please wait...",
      });
      const config = {
        SecureToken: "a1abf822-6fe9-4a60-9cad-0385160c494f",   
        To: "reyanshr1234@gmail.com",
        From:"royalsachin2001@gmail.com",
        Subject: formData.subject,
        Body: `name: ${formData.name}
               phone: ${formData.phone}
               email: ${formData.email}
              ${formData.subject}`,
      };
      if(window.Email){
        window.Email.send(config).then((res)=>{
          props.onClose();
          showToast("Success", "Email send successfully");
        }).catch((errors)=>{
          showToast("Alert", errors);

        })
      }
    } else {
      // toast.info("Verify your mobile number");
      showToast("Info", "All fields are required*");
    }
  };

  return (
    <div className="sachin-send-message-form">
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
            <button className="send-msg-btn" type="submit">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SendMessageForm;
