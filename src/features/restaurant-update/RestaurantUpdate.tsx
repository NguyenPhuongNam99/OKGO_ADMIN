import React from "react";
import InputContent from "../../components/input/InputContent";
import "./restaurantUpdate.scss";


//thêm trường miêu tả khách sạn : décription
const RestaurantUpdate = () => {
  return (
    <div className="containerRestaurantUpdate">
      <div className="blockRestaurant">
        <div className="headerRestaurant">
          <p className="sizeHeaderText">CẬP NHẬT NHÀ HÀNG </p>
        </div>
        <div className="contentRestaurant">
          <div className="leftContent">
            <InputContent title='Tên khách sạn' />
            <InputContent title='Địa chỉ'/>
            <InputContent title='Địa chỉ cụ thể'/>
            <InputContent title='Miêu tả'/>
          </div>
          <div className="leftContent">
            <InputContent title='Thời gian mở cửa' />
            <InputContent title='Thời gian đóng cửa'/>
            <InputContent title='Đánh giá'/>
            <InputContent title='Giá'/>
          </div>
        </div>
        <div className="footerContent">
            <div className="imageContainer">
               <div className="imageContainerLeft">
                    <p>Ảnh</p>
               </div>
               <div className="imageContainerRight">

               </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantUpdate;
