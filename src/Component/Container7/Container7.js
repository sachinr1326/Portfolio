
import "./Container7.css";
import {container7} from  "../JsonData"
function Container7() {

  return (
    <section className="sachin-container-7"  id='Experience'>
      {/* {/ =============================container 10================= /} */}
      <div className="sachin-container-main-7">
        {/* {/ =======================section 1==================== /} */}
        <div className="sachin-common-container">
          <div className="section-1">
            <h4 className="title">{container7.title}</h4>
            
            <div className="card-sec-1 mt-5">

              {container7.experience.map((res,index)=>(
  <div key={index} className="exp-item">
  <span className="dots-icon">
  <i class="fa-solid fa-award"></i>
  </span>
  <div className="exp-card">
    <div className="company-sec">
  <div className="company">{res.company}</div>
  <div className="designation">{res.designation}</div>

    </div>

  <div className="location"><i class="fa-solid fa-location-dot me-1"></i>{res.location}</div>
  <div className="exp"><i class="fa-regular fa-calendar-days me-1"></i> {res.experience}</div>
  <ul className="exp-list">
  {res.description.map((res,index)=>(
<li key={index}>{res}</li>

  ))}

  </ul>
</div>
</div>
              ))}
        






            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Container7;
