import React, { useState } from 'react';
import './ThemeSelector.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
const ThemeSelector = () => {
    const [show,setShow]=useState(false);
    const [theme, setTheme] = useState('theme1');


    const changeTheme = (selectedTheme) => {
        document.querySelector("body").setAttribute("data-theme",selectedTheme);
        setShow(false);
        setTheme(selectedTheme)
      };
      const themeButtons = [
        { id: 'theme1', className: 'theme-button1' },
        { id: 'theme2', className: 'theme-button2' },
        { id: 'theme3', className: 'theme-button3' },
        { id: 'theme4', className: 'theme-button4' },
        { id: 'theme5', className: 'theme-button5' },
      ];
  return (

   <OverlayTrigger
          trigger="click"
          show={show}
          placement={"bottom"}
          overlay={
            <Popover id={`popover-positioned-bottom`}>
              <Popover.Header as="h3" className='header' >Choose Theme</Popover.Header>
              <Popover.Body className=''>
                    <div className="theme-selector">
                    {themeButtons.map(button => (
                <button
                  key={button.id}
                  className={`${button.className} theme-btn ${theme === button.id ? 'active' : ''}`}
                  onClick={() =>changeTheme(button.id)}
                >
                 <span className='active-theme'><i className="fa-solid fa-circle-check"></i></span>
                </button>
              ))}
      </div>
              </Popover.Body>
            </Popover>
          }
        >
          <button className="theme-btn-trigger" onClick={()=>setShow(!show)}><i class="fa-solid fa-palette"></i></button>
        </OverlayTrigger>

  
  );
};

export default ThemeSelector;
