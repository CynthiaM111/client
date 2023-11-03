import AnnouncementCard from './components/announcementCard'
import styles from './styles.css'
import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { Button, Input } from 'antd'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles

import {
  addAnnouncement,
  getAllAnnouncements
} from '../../reducers/announcementsReducer'
import useCoursePrivilege from '../../hooks/useCourseprivilege'

const Feed = ({ announcements, user }) => {
  return announcements.map((ann) => {
    return (
      <AnnouncementCard
        key={ann._id}
        announcement={ann}
        user={user}
        styles={styles}
      />
    )
  })
}

const AnnouncementsFeed = ({ courseId }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllAnnouncements(courseId))
  }, [dispatch, courseId])
  const user = useSelector((state) => state.auth.user)
  const announcements = useSelector((state) => state.announcements)
  const [annText, setAnnText] = useState('')
  const [title, setTitle] = useState('')
  
  
  const setEditorHtml = (html) => {
    setAnnText(html);
  };
  const { privilege } = useCoursePrivilege()

  
  const onPost = () => {
    if (annText !== '') {
      dispatch(addAnnouncement(courseId, annText,title))
      //dispatch(addAnnouncement(courseId, editorHtml, title));
      setAnnText('')
      setTitle('')
      
    } else console.log('cannot post empty post')
  }
//   if (editorHtml!== '') {
//     // dispatch(addAnnouncement(courseId, annText,title))
//      dispatch(addAnnouncement(courseId, editorHtml, title));
//      //setAnnText('')
//      setTitle('')
//      setEditorHtml('');
//    } else console.log('cannot post empty post')
//  }

  const onTxtChange = (txt) => {
    setAnnText(txt.target.value)
  }

  

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }],
      ['bold', 'italic','underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
    ],
  };

  const formats = [
    'header',
    'bold', 'italic',
    'list', 'bullet',
    'link', 'image',
  ];

  return (
    <div>
      {privilege === 'instructor' && (
        
        <span>
          <div style={{ marginBottom: '10px' }}>
          <strong>Title:</strong>&nbsp;&nbsp;&nbsp;
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your announcement title"
          />
          
        </div>
        <ReactQuill
            value={annText}
            onChange={setEditorHtml}
            modules={modules}
            formats={formats}
            placeholder="Write your announcement!"
          />
          {/* <Input.TextArea
            size="large"
            allowClear={true}
            bordered={true}
            value={annText}
            placeholder="Write your announcement!"
            onChange={onTxtChange}
            className="txt"
          ></Input.TextArea> */}
          <Button className="postButton" onClick={onPost}>
            Post
          </Button>
        </span>
      )}
      <Feed announcements={announcements} user={user} />
    </div>
  )
}

export default AnnouncementsFeed
