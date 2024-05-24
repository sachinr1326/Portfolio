import React from 'react'
import resume from "../../image/Resume_24_05.pdf"
import developer1 from "../../image/developer1.png"
import "./Container1.css"
import HireMe from '../../GlobalComponent/HireMe';
import { TypeAnimation } from 'react-type-animation';
import { useToast } from '../../GlobalComponent/ToastContext';
function Container1() {
    const {showToast}=useToast();
    const [modalShow, setModalShow] = React.useState(false);
    const downloadResume = () => {
        const link = document.createElement('a');
        link.href = resume; // Adjust the path to your resume file
        link.download = 'Sachin_Thakur_Resume.pdf'; // The filename you want to use
        link.click();
        showToast("Info","Sachin Thakur Resume download successfully!")
      };
  return (
    <section className='sachin-container-1' id='Profile'>
      <div className='animation-card'></div>
        <HireMe
        show={modalShow}
        onHide={() => setModalShow(false)}
        onClose={() => setModalShow(false)}
        
        />
        <div className='sachin-common-container-1'>
        <div className='section'>
        <div className='section-1'>
            <div className='img-sec-1'>
                <div className='img-back'></div>
                <img src={developer1} alt='Sachin Thakur'/>
            </div>
            <div className='address-detail-sec'>
<div className='address'>
<i class="fa-solid fa-location-dot"></i>
Noida, Uttar pradesh, India
</div>
<a href="mailto:sachin.thakur.mail@gmail.com" className='social-mail'>
        <i className="fa-solid fa-envelope"></i>
        sachin.thakur.mail@gmail.com
      </a>
      <a href="tel:+919557587998" className='social-phone'>
        <i className="fa-solid fa-phone"></i>
        +919557587998
      </a>

            </div>
        </div>
        <div className='section-2'>
            <div className='dev-detail'>
            <div className='name'>Hi, It's <span className='color-text'>Sachin Thakur</span></div>
            <div className='designation'>i'm a 
            <TypeAnimation
              sequence={["Software Engineer",1000,"Web Developer", 1000,"Software Developer",1000,"Full Stack Developer",1000,"Frontend Developer",1000,"Android Developer" ]}
              wrapper="span"
              className="color-text"
              speed={5}
              repeat={0}
            />
            </div>
            <div className='about'>Highly motivated software developer with experience in React JS, Python, and JavaScript, proven ability to quickly learn and apply new technologies. Seeking to leverage skills and knowledge to secure an entry-level software developer role, actively contributing to the growth and success of the organization. Looking to kickstart my career in a dynamic and collaborative environment, where I can contribute my strong programming abilities and passion for problem-solving. Seeking a challenging position to utilize my technical skills and knowledge in developing software solutions.</div>
            </div>
            <div className='dev-social'>
            <a href="https://www.linkedin.com/in/sachin-thakur-mail/" target="_blank" rel="noopener noreferrer" className='social-icon'>
        <i className="fa-brands fa-linkedin"></i>
      </a>
      <a href="https://github.com/sachinr1326" target="_blank" rel="noopener noreferrer" className='social-icon'>
        <i className="fa-brands fa-github"></i>
      </a>
      <a href="https://www.instagram.com/reyanshrajput_98?igsh=Z2d5dG9hNmZxemM0" target="_blank" rel="noopener noreferrer" className='social-icon'>
        <i className="fa-brands fa-instagram"></i>
      </a>
      <a href="https://www.facebook.com/reyansh.rajput.1671?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className='social-icon'>
        <i className="fa-brands fa-facebook"></i>
      </a>
            </div>
            <div className='btn-sec'>
            <button className='hire-me' onClick={()=>setModalShow(true)}>Hire Me</button>
            <button className='resume' onClick={downloadResume}>Download Resume <i class="fa-solid fa-download ms-1"></i></button>

            </div>
        </div>
        </div>
       
        </div>
    </section>
  )
}

export default Container1
