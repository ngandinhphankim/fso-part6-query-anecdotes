import { useContext, useEffect, useState } from "react"
import NotiContext, { clearNotiAction } from "./NotiContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const [showNoti, setShowNoti] = useState(false)
  const [noti, notiDispatch] = useContext(NotiContext)

  useEffect(() => {
    if (noti) {
      setShowNoti(true)
      const timer = setTimeout(() => {
        setShowNoti(false)
        notiDispatch(clearNotiAction())
      }, 5000)
      
      return () => clearTimeout(timer)
    }
  }, [noti])

  return (
    showNoti ?
      <div style={style}>
        {noti}
      </div>
      : null
  )
}

export default Notification
