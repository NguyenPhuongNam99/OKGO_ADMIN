import React, { useRef } from "react";
import './styles.scss'
const Login = () => {

    const userName = useRef(null);

    return (
        <div className="container">
            <div className="blockContent">
                <div className="itemContent">
                    <img className="itemContent_image" src={require('../../assets/images/travel.webp')} />
                </div>
                <div className="itemContent">
                    <div className="itemContentCenter">
                        <img className='itemContent_imageLogo' src={require('../../assets/images/okgoimage.png')} />
                        <p className="headerLogin">chào mừng</p>
                        <p className="titleLogin">Hãy đăng nhập để trải nghiệm cùng chúng tôi.</p>
                        <div className="inputContainer">
                            <input placeholder="Tên đăng nhập" className="input" ref={userName}  /> 
                            <input placeholder="Mật khẩu" className="input" /> 
                        </div>
                        <div className="buttonClick">
                            <button className="button" type="button">Đăng nhập</button>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login;