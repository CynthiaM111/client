import React from 'react'

import { useHistory } from 'react-router-dom'

import { Button, Dropdown, Menu, Space } from 'antd'
import { Link, NavLink, useRouteMatch } from 'react-router-dom'

import { DownOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import useCoursePrivilege from '../../hooks/useCourseprivilege'

const CourseMenu = ({ url, privilege }) => {
  return (
    <Menu>
      
      {/* <Menu.Item>
        <Link to={`${url}/gradebook`}>GradeBook</Link>
      </Menu.Item> */}
      <Menu.Item>
        <Link to={`${url}/discussions`}>Questions</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={`${url}/announcments`}>Announcements</Link>
      </Menu.Item>
      {/* <Menu.Item>
        <Link to={`${url}/assignments`}>Assignments</Link>
      </Menu.Item> */}

      {privilege !== 'student' && (
        <Menu.Item>
          <Link to={`${url}/particpants`}>Participants</Link>
        </Menu.Item>
      )}

      {privilege !== 'student' && (
        <Menu.Item>
          <Link to={`${url}/settings`}>Settings</Link>
        </Menu.Item>
      )}
    </Menu>
  )
}

const CourseNavigation = () => {
  const { params, url } = useRouteMatch('/app/course/:id')

  const history = useHistory()

  let course = useSelector((state) =>
    state.courses.data.find((course) => course.id === params.id)
  )

  const { privilege } = useCoursePrivilege(params.id)

  const popHistory = () => {
    history.goBack()
  }

  return (
    <>
      <Space>
        <Button
          shape="circle"
          type="secondary"
          onClick={popHistory}
          icon={<ArrowLeftOutlined />}
        ></Button>
        <Dropdown
          overlay={<CourseMenu url={url} privilege={privilege} />}
          placement="bottomCenter"
        >
          <Button
            shape="round"
            style={{ backgroundColor: course.backgroundColor }}
          >
            <span style={{ fontWeight: 600, color: 'white' }}>
              {course.name}
            </span>{' '}
            <DownOutlined style={{ color: 'white' }} />
          </Button>
        </Dropdown>
      </Space>
      {/* <NavLink to={`${url}/modules`}>
        <Button type="text">Modules</Button>
      </NavLink>
      <NavLink to={`${url}/lectures`}>
        <Button type="text">Lectures</Button>
      </NavLink> */}
       <NavLink to={`${url}/discussions`}>
       <Button type="text">Questions</Button>
      </NavLink>
      <NavLink to={`${url}/announcments`}>
       <Button type="text">Announcements</Button>
      </NavLink>
     
      {/* <NavLink to={`${url}/assignments`}>
        <Button type="text">Assignments</Button>
      </NavLink> */}
      <NavLink to={`${url}/particpants`}>
       <Button type="text">Participants</Button>
      </NavLink>
      {privilege !== 'student' && (
      <NavLink to={`${url}/settings`}>
       <Button type="text">Settings</Button>
      </NavLink>)}
      {/* <NavLink to={`${url}/exams`}>
        <Button type="text">Exams</Button>
      </NavLink> */}
      {/* <NavLink to={`${url}/exam/12345`} target="_blank">
        <Button type="text">CheatingDetection</Button>
      </NavLink> */}
        
       
    </>
  )
}

export default CourseNavigation
