
import "./Header.css"
import ThemeSelector from './ThemeSelector';
import LanguageSelector from './LanguageSelector';
import { useEffect, useState } from "react";

function Header() {
  const [activeItem, setActiveItem] = useState('Profile');

  const handleItemClick = (item) => {
    setActiveItem(item);
    document.getElementById(item).scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let currentSection = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
          currentSection = section.getAttribute('id');
        }
      });

      setActiveItem(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='header'>
    <nav className="navbar navbar-expand-lg ">
    <div className="container-fluid">
      <a className="navbar-brand" href="#Profile">Sachin</a>
      <button className="navbar-toggler menu-btn-sachin" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <i class="fa-solid fa-bars"></i>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
        {['Profile','Experience', 'Services', 'Skills', 'Projects', 'Education', 'Contact Us'].map((item) => (
                <li className="nav-item" key={item}>
                  <a
                    className={`nav-link ${activeItem === item ? 'active' : ''}`}
                    href={`#${item}`}
                    onClick={() => handleItemClick(item)}
                  >
                    {item}
                  </a>
                </li>
              ))}
          <li className="nav-item">
            <div className="nav-link">

          <ThemeSelector />
            </div>
          </li>
          <li className="nav-item">
          <div className="nav-link">
      <LanguageSelector />
      </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  </div>
  )
}

export default Header
