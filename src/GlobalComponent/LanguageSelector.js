import React, {useState } from 'react';
import './LanguageSelector.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
const LanguageSelector = () => {
    const [show,setShow]=useState(false);
    const [theme, setTheme] = useState('font0');
   

    const changeTheme = (selectedTheme) => {
        document.querySelector("body").setAttribute("data-font",selectedTheme);
        setShow(false);
        setTheme(selectedTheme)
      };
      const themeButtons = [
        { id: 'font0', className: 'font-button0' },
        { id: 'font1', className: 'font-button1' },
        { id: 'font2', className: 'font-button2' },
        { id: 'font3', className: 'font-button3' },
        { id: 'font4', className: 'font-button4' },
        { id: 'font5', className: 'font-button5' },
        { id: 'font6', className: 'font-button6' },
        { id: 'font7', className: 'font-button7' },
      ];
  return (
    <div>
   <OverlayTrigger
          trigger="click"
          show={show}
          placement={"bottom"}
          overlay={
            <Popover id={`popover-language-bottom-lang`}>
              <Popover.Header as="h3" className='header'>Choose Font</Popover.Header>
              <Popover.Body>
                    <div className="font-selector m-3">
                    {themeButtons.map(button => (
                <button
                  key={button.id}
                  className={`${button.className} font-btn ${theme === button.id ? 'active' : ''}`}
                  onClick={() =>changeTheme(button.id)}
                >
                Select font family
                 <span className='active-font'><i className="fa-solid fa-circle-check"></i></span>
                </button>
              ))}
           
      </div>
              </Popover.Body>
            </Popover>
          }
        >
          <button className="font-btn-trigger" onClick={()=>setShow(!show)}><i class="fa-solid fa-language"></i></button>
        </OverlayTrigger>
</div>
  
  );
};

export default LanguageSelector;
