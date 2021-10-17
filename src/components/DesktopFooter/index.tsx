import React, {memo, useCallback, useEffect, useState} from 'react'
import {Layout, Space, DatePicker, TimePicker, Divider} from 'antd'
import moment from 'moment'

import './desktop-footer.scss'

const {Footer} = Layout

interface IDesktopFooter {
  menu: React.ReactNode
  appBar: React.ReactNode
}

export const DesktopFooter: React.FC<IDesktopFooter> = memo(
  ({menu, appBar}) => {
    const [time, setTime] = useState<moment.Moment>()
    const [date, setDate] = useState<moment.Moment>()

    useEffect(() => {
      setTime(moment())
      setDate(moment())
      const interval = setInterval(() => {
        setTime(moment())
      }, 1000)
      return () => {
        clearInterval(interval)
      }
    }, [])

    const onDateChange = useCallback(date => {
      setDate(date)
    }, [])

    return (
      <Footer className="desktop-footer">
        {menu}
        <Divider type="vertical" style={{height: 'auto'}} />
        <Space align="start" className="desktop-footer__bar">
          <Space>{appBar}</Space>
          <Space>
            <TimePicker bordered={false} allowClear={false} value={time} />
            <DatePicker
              onChange={onDateChange}
              bordered={false}
              allowClear={false}
              value={date}
            />
          </Space>
        </Space>
      </Footer>
    )
  },
)
