import "../styles/Footer.scss";
import { LocationOn, LocalPhone, Email } from "@mui/icons-material";
import { FaFacebookSquare, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_left">
        <a href="/">
          <img src="/assets/logo.png" alt="logo" />
        </a>
        <p> created by:<span> Hajer & Omaima @pfe2024</span> </p>
        <p>  powered by: <a href="https://logicom-dev.com/"><span>LOGICOM</span></a></p>
      </div>

      <div className="footer_center">
        <h3>Contact</h3>
        <ul>
          <li><span className="fb"><FaFacebookSquare /> FaceBook: Dream Travel</span></li>
          <li><span className="in"><FaInstagram /> Instagram: Dream Travel</span></li>
          <li><span className="yt"><FaYoutube /> Youtube: Dream Travel</span></li>
          <li><span className="ln"><FaLinkedin /> LinKedin: Dream Travel</span></li>

        </ul>
        
        
        
          
        {/* <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/services">Services</a></li>
         <li><a href="/about">About</a></li>
          <li>About Us</li>
          <li>Terms and Conditions</li>

          <li>
            powered by: <a href="https://logicom-dev.com/">LOGICOM</a>
          </li>
        </ul> */}
      </div>

      <div className="footer_right">
        <h3>Privacy Policy</h3>
        <div className="footer_right_info">
        <p>
        At Dream Travel, we prioritize your privacy and security. Our privacy policy outlines how we handle your personal information. We collect only what's necessary to provide our services, like your name and contact details. Rest assured, we never sell or share your data without your consent. We adhere to strict privacy practices and comply with laws to ensure the confidentiality of your information. Your trust is essential to us, and we're here to address any questions or concerns you may have.
        </p>
       
          {/* <LocalPhone />
          <p>+216 58 080 681</p>
        </div>
        <div className="footer_right_info">
          <Email />
          <p>dreamtravel@support.com</p> */}
        </div>
        <img src="/assets/payment.png" alt="payment" />
      </div>
    </div>
  );
};

export default Footer;

// import "../styles/Footer.scss";
// import { LocationOn, LocalPhone, Email } from "@mui/icons-material";
// const Footer = () => {
//   return (
//     <div className="footer">
//       <div className="footer_left">
//         <a href="/">
//           <img src="/assets/logo.png" alt="logo" />
//         </a>
//       </div>

//       <div className="footer_center">
//         <h3>Useful Links</h3>
//         <ul>
//           <li>About Us</li>
//           <li>Terms and Conditions</li>
//           <li>Return and Refund Policy</li>
//         </ul>
//       </div>

//       <div className="footer_right">
//         <h3>Contact</h3>
//         <div className="footer_right_info">
//           <LocalPhone />
//           <p>+216 58 080 681</p>
//         </div>
//         <div className="footer_right_info">
//           <Email />
//           <p>dreamnest@support.com</p>
//         </div>
//         <img src="/assets/payment.png" alt="payment" />
//       </div>
//     </div>
//   );
// };

// export default Footer;
