import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { displayOnePin } from "../../store/pin";
import { useSelector, useDispatch } from "react-redux";

const PinDetailPage = () => {
    const dispatch = useDispatch()
    const {pinId} = useParams()
    const history= useHistory()
    const pinDetail = useSelector((state) => state?.pinsReducer[pinId])
    // const sessionUser = useSelector((state) => state.session.user?.id)
    console.log("::::::::::::::", pinDetail)
    const homePage = () => {
        history.push('/')
    }
    useEffect(() => {
        dispatch(displayOnePin(pinId))
    }, [dispatch, pinId])   
    

    return (
        <div>
            <div>
                <button onClick={homePage} style={{ cursor: 'pointer' }}>Go Back</button>
                <img 
                           
            src={pinDetail?.img_url} />
            </div>
            <div>Pin Title: {pinDetail?.title}</div>
            <div>Pin Description: {pinDetail?.description}</div>
            <div>{pinDetail?.link}</div>
        </div>
        
    )
}

export default PinDetailPage