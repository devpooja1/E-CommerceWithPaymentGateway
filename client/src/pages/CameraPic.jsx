import Pic from "../images/camerapic1.avif"
import Pic1 from "../images/camerapic2.avif"
import Pic2 from "../images/camerapic3.avif"
import Pic3 from "../images/camerapic4.avif"
import "../css/camerapic.css"
const CameraPic=()=>{
    return(
        <>
        <div>
          <div>
          <img src={Pic} alt="" className="camera"/>
          </div>
          <div>
          <img src={Pic1} alt="" className="camera"/>
          </div>
          <div>
          <img src={Pic2} alt="" className="camera"/>
          </div>
          <div>
          <img src={Pic3} alt="" className="camera"/>
          </div>
        </div>
        </>
    )
}
export default CameraPic;