import "./AboutView.scss";
import lvvCinema from "../../asset/image/lvv-cinema.jpg";
import tduCinema from "../../asset/image/tdu-cinema.jpg";
import tdCinema from "../../asset/image/td-cinema.jpg";
export default function AboutView() {
  return (
    <div className="about">
      <div className="about-container">
        <div className="about-header">
          <h2>MOVIEON</h2>
        </div>
        <div className="about-content">
          <p>
            MOVIEON là một điểm đến thú vị cho những người đam mê và yêu thích
            điện ảnh. Được thành lập vào năm 2024, rạp phim may mắn đã trở thành
            một phần không thể thiếu của cộng đồng yêu điện ảnh tại thành phố.
          </p>
          <p className="about-title">Mục tiêu hoạt động:</p>
          <p>
            MOVIEON là một điểm đến thú vị cho những người đam mê và yêu thích
            điện ảnh. Được thành lập vào năm 2024, rạp phim may mắn đã trở thành
            một phần không thể thiếu của cộng đồng yêu điện ảnh tại thành phố.
          </p>
          <p className="about-title">Cụm rạp:</p>
        </div>
        <div className="about-cinema">
          <div className="about-cinema-title">
            <div className="about-cinema-line"></div>
            <h3>MOVIEON LÊ VĂN VIỆT</h3>
          </div>
          <div className="about-cinema-container">
            <div className="about-wrapper">
              <div className="about-cinema-content">
                <p className="about-title">Địa điểm: </p>
                <p>
                  Lê Văn Việt, Phường Tăng Nhơn Phú A, Thành Phố Thủ Đức, Hồ Chí
                  MIinh
                </p>
              </div>
              <div className="about-cinema-content">
                <p className="about-title">Ngày hoạt động: </p>
                <p>
                  Mở cửa từ thứ Hai đến Chủ Nhật, từ 10 giờ sáng đến 11 giờ tối.
                </p>
              </div>
              <div className="about-cinema-content">
                <p className="about-title">Sức chứa: </p>
                <p>
                   Rạp có thể chứa đến 300 khán giả, với ghế ngồi thoải mái và
                  góc nhìn tốt từ mọi vị trí.
                </p>
              </div>
            </div>
            <div className="about-image">
              <img src={lvvCinema} alt="" />
            </div>
          </div>
        </div>
        <div className="about-cinema">
          <div className="about-cinema-title">
            <div className="about-cinema-line"></div>
            <h3>MOVIEON BÌNH DƯƠNG</h3>
          </div>
          <div className="about-cinema-container">
            <div className="about-wrapper">
              <div className="about-cinema-content">
                <p className="about-title">Địa điểm: </p>
                <p>
                  Lê Văn Việt, Phường Tăng Nhơn Phú A, Thành Phố Thủ Đức, Hồ Chí
                  MIinh
                </p>
              </div>
              <div className="about-cinema-content">
                <p className="about-title">Ngày hoạt động: </p>
                <p>
                  Mở cửa từ thứ Hai đến Chủ Nhật, từ 10 giờ sáng đến 11 giờ tối.
                </p>
              </div>
              <div className="about-cinema-content">
                <p className="about-title">Sức chứa: </p>
                <p>
                   Rạp có thể chứa đến 300 khán giả, với ghế ngồi thoải mái và
                  góc nhìn tốt từ mọi vị trí.
                </p>
              </div>
            </div>
            <div className="about-image">
              <img src={lvvCinema} alt="" />
            </div>
          </div>
        </div>
        <div className="about-cinema">
          <div className="about-cinema-title">
            <div className="about-cinema-line"></div>
            <h3>MOVIEON THỦ ĐỨC</h3>
          </div>
          <div className="about-cinema-container">
            <div className="about-wrapper">
              <div className="about-cinema-content">
                <p className="about-title">Địa điểm: </p>
                <p>
                  Lê Văn Việt, Phường Tăng Nhơn Phú A, Thành Phố Thủ Đức, Hồ Chí
                  MIinh
                </p>
              </div>
              <div className="about-cinema-content">
                <p className="about-title">Ngày hoạt động: </p>
                <p>
                  Mở cửa từ thứ Hai đến Chủ Nhật, từ 10 giờ sáng đến 11 giờ tối.
                </p>
              </div>
              <div className="about-cinema-content">
                <p className="about-title">Sức chứa: </p>
                <p>
                   Rạp có thể chứa đến 300 khán giả, với ghế ngồi thoải mái và
                  góc nhìn tốt từ mọi vị trí.
                </p>
              </div>
            </div>
            <div className="about-image">
              <img src={tduCinema} alt="" />
            </div>
          </div>
        </div>
        <div className="about-cinema">
          <div className="about-cinema-title">
            <div className="about-cinema-line"></div>
            <h3>MOVIEON THẢO ĐIỀN</h3>
          </div>
          <div className="about-cinema-container">
            <div className="about-wrapper">
              <div className="about-cinema-content">
                <p className="about-title">Địa điểm: </p>
                <p>Quốc Hương, Thảo Điền, Quận 2, Thành phố Hồ Chí Minh</p>
              </div>
              <div className="about-cinema-content">
                <p className="about-title">Ngày hoạt động: </p>
                <p>
                  Mở cửa từ thứ Hai đến Chủ Nhật, từ 10 giờ sáng đến 11 giờ tối.
                </p>
              </div>
              <div className="about-cinema-content">
                <p className="about-title">Sức chứa: </p>
                <p>
                   Rạp có thể chứa đến 300 khán giả, với ghế ngồi thoải mái và
                  góc nhìn tốt từ mọi vị trí.
                </p>
              </div>
            </div>
            <div className="about-image">
              <img src={tdCinema} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
