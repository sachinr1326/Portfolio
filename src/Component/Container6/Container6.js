import SendMessageForm from "../../GlobalComponent/SendMessageForm";
import { container6 } from "../JsonData";
import "./Container6.css";
function Container6() {
  return (
    <section className="sachin-container-6" id="Contact Us">
      {/* {/ =============================container 10================= /} */}
      <div className="sachin-container-main-6">
        {/* {/ =======================section 1==================== /} */}
        <div className="sachin-common-container-6">
       <SendMessageForm title={container6.title} color_title={container6.color_title}/>
        </div>
      </div>
    </section>
  );
}

export default Container6;
