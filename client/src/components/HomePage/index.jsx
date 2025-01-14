import React, { useEffect } from 'react'
import "./IntroductionPage.css"
import ConnetingButtons from '../ConnetingButtons'
import { connect } from 'react-redux'
import { setIsRoomHost } from '@/store/action'
const Introduction = ({setIsRoomHostAction}) => {
    // const { setIsRoomHostAction } = props;

    useEffect(() => {
        setIsRoomHostAction(false)
    }, [])
  return (
    <div className="introduction_page_panel">
      {/* <h2>Clone</h2> */}
    <img src={"logo.png"} className="introduction_page-image" />
    <ConnetingButtons />
    </div>
  )
}

const mapActionsToProps = (dispatch) => {
    return {
        setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost))
    }
}

export default connect(null, mapActionsToProps)(Introduction)
