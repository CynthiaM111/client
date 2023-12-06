import React, { useState } from 'react'
import { Card, Button, Input,Tag } from 'antd'
import { useDispatch } from 'react-redux'
import Meta from 'antd/lib/card/Meta'
import Avatar from 'antd/lib/avatar/avatar'
import AllComments from './commentCard'
import { CheckCircleOutlined } from '@ant-design/icons';

import {
  removeDiscussion,
  addComment
} from '../../../reducers/discussionReducer'
import './../styles.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

import 'draft-js/dist/Draft.css'; // Import Draft.js styles
import { Editor, EditorState, ContentState, convertFromRaw } from 'draft-js';

const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline'],
    ['link' ],
  ],
};

const formats = [
  'header',
  'font',
  'list',
  'bold',
  'italic',
  'underline',
  'link'
 
];

const DiscussionCard = ({ discussion, user }) => {
  const dispatch = useDispatch()
  const [commText, setcommText] = useState('')
  //const contentState = convertFromRaw(JSON.parse(discussion.data));

  //const [editorState, setEditorState] = useState(EditorState.createEmpty()); // Add editorState


  const setEditorHtml = (html) => {
    setcommText(html);
  };

  const onPost = () => {
    if (commText !== '') {
      // const plainText = editorState.getCurrentContent().getPlainText('\u0001');
      dispatch(addComment(discussion._id,commText,user))
      setcommText('')
      // setEditorState(EditorState.createEmpty());
  } else {console.log('Can not post empty comment')
  }}

  const onTxtChange = (txt) => {
    setcommText(txt.target.value)
  }

  const formatDate = (date) => {
    // Function to format the date as needed
    // You can use libraries like moment.js for a more comprehensive solution
    const diffInMinutes = Math.floor((Date.now() - new Date(date)) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 24 * 60) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const days = Math.floor(diffInMinutes / (24 * 60));
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
  };

  const renderAnnouncementContent = () => {
    const content = discussion.data;
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const imageElements = doc.querySelectorAll('img');
  
    if (imageElements.length > 0) {
      return (
        <div>
          {Array.from(imageElements).map((imgElement, index) => (
            <img
              key={index}
              src={imgElement.getAttribute('src')}
              alt={`Image ${index + 1}`}
            />
          ))}
        </div>
      );
    } else {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }
  };
  
  return (
    <div className="container">
      <Card
        hoverable
        className="customcard"
        title={
          <div>
            <Meta
              avatar={<Avatar src={discussion.user && discussion.user.photo} />}
              //avatar={<Avatar src={userAvatar} />}
              title={
                <span>
                   {discussion.isAnonymous==='Yes'? 'Anonymous' : discussion.user && discussion.user.name}
                  
                  {discussion.user && discussion.user.role === 'instructor' ? (
                    <Tag color="cyan" style={{ marginLeft: '8px' }}>
                      INSTRUCTOR
                    </Tag>
                  ) : (
                    <Tag color="orange" style={{ marginLeft: '8px' }}>
                      STUDENT
                    </Tag>
                  )}
                
                </span>
              }
            />
            {discussion.user && discussion.user._id === user._id && (
              <Button
                disabled={!(discussion.user._id === user._id)}
                className="deleteButton"
                onClick={() => {
                  dispatch(removeDiscussion(discussion._id))
                }}
              >
                Delete
              </Button>
            )}
            
          </div>
        }
      >
       <div>
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', marginBottom: '5px', fontSize: '18px' }}>
            {discussion.title}
          </span>
          {/* Add the green tick tag for answered discussions */}
          {discussion.answered && (
            <Tag color="brown" style={{ marginLeft: '8px' }}>
              <CheckCircleOutlined /> Answered
            </Tag>
          )}
          {discussion.isPrivate && (
            <Tag color="#ff5757" style={{ marginLeft: '8px' }}>
              PRIVATE
            </Tag>)}
        </span>
      </div>
        <div style={{ fontSize: '12px', fontWeight: 'italic',color: 'green', marginTop: '5px' }}>
          {formatDate(discussion.createdAt)} in <strong>{discussion.category}</strong>
        </div>
        {renderAnnouncementContent()}
        <div className="dis" style={{ whiteSpace: 'pre-line' }}></div>
        {/* <Editor
            editorState={EditorState.createWithContent(contentState)}
            readOnly={true} />// Make the content read-only */}
        <Card
          size="small"
          type="inner"
          className="commentcard"
          title="comments"
        >
          <AllComments
            comments={discussion.comments}
            dId={discussion._id}
            Luser={user}
          />
        </Card>
        <div style={{ marginBottom: '10px' }}>
        
        <ReactQuill
          modules={modules}
          formats={formats}
          value={commText}
          onChange={setEditorHtml}
          placeholder="Write your comment!"
       />
      </div>
        {/* <div className="container">
        <textarea
            rows="4"  // You can adjust the number of rows
            value={commText}
            onChange={onTxtChange}
            placeholder="Add your comment..."
            className="txt"
          ></textarea> */}
          <Button onClick={onPost}>Add Comment</Button>
        
      </Card>
    </div>
 
    )
}

export default DiscussionCard


