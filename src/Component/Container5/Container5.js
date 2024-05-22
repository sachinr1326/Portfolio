import EdCard from "../../GlobalComponent/Cards/EdCard"
import { container5 } from "../JsonData"
import "./Container5.css"

function Container5() {

  return (
    <section className='sachin-container-5' id="Education">
      {/* {/ =============================container 10================= /} */}
      <div className="sachin-container-main-5">
        {/* {/ =======================section 1==================== /} */}
        <div className="sachin-common-container-5">
          <div className="section-1">
            <div className="head-container">

            <h4 className="title">
              {container5.title}
              <span className="color-text ms-1">{container5.color_title}</span>
            </h4>
            <h1 className="developer">Sachin Thakur</h1>
            </div>

            <div className="ed-card-section">
              {container5.education.map((res,index)=>(

           <EdCard key={index} isleft={index%2 === 0?true:false} data={res}/>
              ))}

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Container5
