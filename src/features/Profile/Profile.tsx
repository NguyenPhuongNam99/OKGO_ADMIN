import React from "react";
import "./profile.scss";

const Profile = () => {
  return (
    <div className="containerProfile">
      <div className="headerText">
        <p className="colorText"> CẬP NHẬT THÔNG TIN CÁ NHÂN</p>
      </div>
      <div className="headerContent">
        <div className="blockContentProfile">
          <div className="contentLeft">
            <div className="itemLeft">
              <p>Họ</p>
            </div>
            <input placeholder="Nhập họ  " className="itemRight" />
          </div>
          <div className="contentLeft">
            <div className="itemLeft">
              <p>Tên</p>
            </div>
            <input placeholder="Nhập tên " className="itemRight" />
          </div>
        </div>
        <div className="blockContentProfile">
          <div className="contentLeft">
            <div className="itemLeft">
              <p>Email</p>
            </div>
            <input placeholder="Nhập email  " className="itemRight" />
          </div>
          <div className="contentLeft">
            <div className="itemLeft">
              <p>Số điện thoại</p>
            </div>
            <input placeholder="Nhập Số điện thoại " className="itemRight" />
          </div>
        </div>
        <div className="blockContentProfile">
          <div className="contentLeft">
            <div className="itemLeft">
              <p>Password</p>
            </div>
            <input placeholder="Nhập password  " className="itemRight" />
          </div>
          <div className="contentLeft">
            <div className="itemLeft">
              <p>Ảnh</p>
            </div>
            <input placeholder="Nhập đường dẫn ảnh " className="itemRight" />
          </div>
        </div>

        <div className="blockContentProfile">
          <div className="contentLeft">
            <div className="itemLeft">
              <p>Giới tính</p>
            </div>
            <div className="checkboxContainer">
               <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" />
               <p className="labelCheck">Nam</p>
            </div>
            <div className="checkboxContainer">
              <input type="checkbox" id="vehicle3" name="vehicle2" value="Boat2" />
              <p className="labelCheck">Nữ</p>
            </div>
              
          </div>
          <div className="contentLeft">
          </div>
        </div>
      </div>

      <div className="footer">
        <button className="clickUpdate" title="Cap nhat">
          Cập nhật
        </button>
      </div>
    </div>
  );
};

export default Profile;
