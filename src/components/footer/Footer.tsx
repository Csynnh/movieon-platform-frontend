import Logo from "../logo/Logo";
import facebook from "../../asset/image/facebook.png";
import instagram from "../../asset/image/instagram.png";
import linkedin from "../../asset/image/linkedin.png";
import github from "../../asset/image/github.png";
import "./index.scss";
const Footer = () => {
  return (
    <footer className={"footer"}>
      <div className="footer-container">
        <div className="footer-wrapper">
          <div className="footer-logo">
            <Logo theme={"secondary"} />
          </div>
          <div className="footer-address">
            <div className="footer-address-item">
              <div className="footer-address-title">
                <span>
                  <svg
                    width="19"
                    height="26"
                    viewBox="0 0 19 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 10.5801C0.9998 11.2988 8.39286 24.9551 9.2145 24.9551C10.0361 24.9551 17.4286 11.2988 17.4286 10.5801C17.4286 9.86132 16.6074 1.95508 9.2143 1.95508C1.64112 1.95508 1.0002 9.86133 1 10.5801Z"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <circle
                      cx="9.21422"
                      cy="10.1698"
                      r="3.92857"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>
                </span>
                <span>Địa chỉ: </span>
              </div>
              <p>Tăng Nhơn Phú A, Quận 9, TPHCM</p>
            </div>
            <div className="footer-address-item">
              <div className="footer-address-title">
                <span>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.9429 16.0693C13.4 16.6121 6.88571 10.0978 6.88571 9.55497C6.88571 9.01213 10.1429 7.38357 9.6 6.29785C9.05714 5.21214 6.34286 2.4979 5.25714 3.0407C3.64815 3.84512 2 6.29783 2 6.29783C3.73714 17.155 15.5714 21.4977 17.2 20.955C18.8286 20.4122 20.4571 18.2408 20.4571 17.6979C20.4571 17.155 17.2 13.355 16.1143 13.8978C15.0286 14.4407 14.4857 15.5264 13.9429 16.0693Z"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <path
                      d="M12.3143 5.21216C13.9429 5.03121 17.3086 5.86359 17.7429 10.6407M12.3143 1.99088C14.92 1.70255 20.3052 3.02887 21 10.6408"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>
                </span>
                <span>Liên hệ: </span>
              </div>
              <p>0352171469 - 0366400874</p>
            </div>
            <div className="footer-address-item">
              <div className="footer-address-title">
                <span>
                  <svg
                    width="24"
                    height="17"
                    viewBox="0 0 24 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.66667 5.18421L10.6993 9.07066C11.3013 9.40335 12.032 9.40335 12.634 9.07066L19.6667 5.18421M3 15.5H20.3333C21.4379 15.5 22.3333 14.6046 22.3333 13.5V3.5C22.3333 2.39543 21.4379 1.5 20.3333 1.5H3C1.89543 1.5 1 2.39543 1 3.5V13.5C1 14.6046 1.89543 15.5 3 15.5Z"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>
                </span>
                <span>Email: </span>
              </div>
              <p>6351071040@st.utc2.edu.vn</p>
            </div>
          </div>
        </div>
        <div className="footer-wrapper">
          <div className="footer-title">Thành viên nhóm</div>
          <div className="footer-desc">Huỳnh Thị Trúc Lam - 6351071040</div>
          <div className="footer-desc">Võ Công Sinh - 6351071062</div>
        </div>
        <div className="footer-wrapper">
          <div className="footer-title">Giáo viên hướng dẫn</div>
          <div className="footer-desc">Nguyễn Văn Dự</div>
        </div>
        <div className="footer-wrapper">
          <div className="footer-title">Về chúng tôi</div>
          <div className="footer-meta">
            <div className="footer-meta-item">
              <img src={facebook} alt="facebook" />
            </div>
            <div className="footer-meta-item">
              <img src={instagram} alt="instagram" />
            </div>
            <div className="footer-meta-item">
              <img src={linkedin} alt="linkedin" />
            </div>
            <div className="footer-meta-item">
              <img src={github} alt="github" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
