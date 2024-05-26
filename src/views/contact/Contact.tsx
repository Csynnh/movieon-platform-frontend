import React from 'react';
import githubIcon from '../../asset/image/githubicon.png';
import fbIcon from '../../asset/image/facebook.png';
import linkinIcon from '../../asset/image/linkedin.png';
import avatar1 from '../../asset/image/Asset 1.png';
import avatar2 from '../../asset/image/Asset 2.png';
import './Contact.scss';
import { NavLink } from 'react-router-dom';
import Logo from '@/components/logo/Logo';
const Contact = () => {
  return (
    <div className='contact'>
      <div className='contact-container'>
        <div className='contact-us'>
          <div className='contact-heading'>
            <h2>VỀ CHÚNG TÔI</h2>
          </div>
          <div className='contact-about'>
            <div className='contact-item'>
              <div className='contact-top'>
                <img src={avatar2} alt='Movieon-image' />
                <div className='contact-content'>
                  <div className='contact-text'>
                    <span className='contact-title'>Họ và tên: </span>
                    <span>Võ Công Sinh</span>
                  </div>
                  <div className='contact-text'>
                    <span className='contact-title'>Vai trò: </span>
                    <span>FE Developer, BE Developer</span>
                  </div>
                </div>
              </div>
              <div className='contact-social'>
                <a href='https://github.com/Csynnh' target='blank' rel='noopener noreferrer'>
                  <img src={githubIcon} alt='Movieon-image' />
                  <span>Github</span>
                </a>
                <a href='https://www.facebook.com/csynhh/' target='blank' rel='noopener noreferrer'>
                  <img src={fbIcon} alt='Movieon-image' />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
            <div className='contact-item'>
              <div className='contact-top'>
                <img src={avatar1} alt='Movieon-image' />
                <div className='contact-content'>
                  <div className='contact-text'>
                    <span className='contact-title'>Họ và tên: </span>
                    <span>Huỳnh Thị Trúc Lam</span>
                  </div>
                  <div className='contact-text'>
                    <span className='contact-title'>Vai trò: </span>
                    <span>FE Developer, BE Developer</span>
                  </div>
                </div>
              </div>
              <div className='contact-social'>
                <a
                  href='https://github.com/HuynhThiTrucLam'
                  target='blank'
                  rel='noopener noreferrer'
                >
                  <img src={githubIcon} alt='Movieon-image' />
                  <span>Github</span>
                </a>
                <a
                  href='https://www.linkedin.com/in/lam-huynh-1338b1210/'
                  target='blank'
                  rel='noopener noreferrer'
                >
                  <img src={linkinIcon} alt='Movieon-image' />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='contact-heading'>
          <h2>VỀ DỰ ÁN</h2>
        </div>
        <div className='contact-project'>
          <div className='contact-project-movie'>
            <h1 slot='navbar' className={'header-logo'}>
              <NavLink to='/'>
                <Logo />
              </NavLink>
            </h1>
            <h3>TÊN DỰ ÁN : XÂY DỰNG WEBSITE ĐẶT VÉ XEM PHIM - MOVIEON</h3>
            <div className='contact-project-link'>
              <span className='contact-title'>Backend:</span>
              <a
                href='https://github.com/Csynnh/movieon-platform-backend'
                target='blank'
                rel='noopener noreferrer'
              >
                <img src={githubIcon} alt='Movieon-image' />
                <span>Github</span>
              </a>
            </div>
            <div className='contact-project-link'>
              <span className='contact-title'>Fontend:</span>
              <a
                href='https://github.com/Csynnh/movieon-platform-frontend'
                target='blank'
                rel='noopener noreferrer'
              >
                <img src={githubIcon} alt='Movieon-image' />
                <span>Github</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
