import DiscussionCard from './components/discussionCard'
import './styles.css'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'



import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { Button, Input, Select, Space, Checkbox, Typography } from 'antd'


import {
  addDiscussion,
  getAllDiscussions
} from '../../reducers/discussionReducer'

const { Text } = Typography;

const { Option } = Select;

const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline'],
    ['link', 'image'],
  ],
};

const formats = [
  'header',
  'font',
  'list',
  'bold',
  'italic',
  'underline',
  'link',
  'image',
];


const Feed = ({ discussions, user }) => {
  return discussions.map((dis) => {
    return <DiscussionCard key={dis._id} discussion={dis} user={user} />
  })
}


const DiscussionFeed = ({ courseId }) => {
  const {Option} =Select
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllDiscussions(courseId))
  }, [dispatch, courseId])
  const user = useSelector((state) => state.auth.user)
  const discussions = useSelector((state) => state.discussions)
  const [disText, setDisText] = useState('')
  const [category, setCategory] = useState('Lecture');
  const [title, setTitle] = useState('')
  const [isAnonymous, setIsAnonymous] = useState('No');
  //const [editorState, setEditorState] = useState(EditorState.createEmpty());


  const setEditorHtml = (html) => {
    setDisText(html);
  };

  const onPost =  () => {
    if (disText !== ''){
      //const contentState = editorState.getCurrentContent();
      //const rawContentState = convertToRaw(contentState);

    
      dispatch(addDiscussion(courseId, disText, category, title, isAnonymous ))
      setTitle('')
      setDisText('')
    // setEditorState(EditorState.createEmpty());
  } else {console.log('cannot post an empty post')
  }}
  
  const onTxtChange = (txt) => {
    setDisText(txt.target.value)
  }
  // const onEditorStateChange = (editorState) => {
  //   setEditorState(editorState);
  // };
  const onCategoryChange = (value) => {
    setCategory(value);
  };

  const onTitleChange =(txt) => {
    setTitle(txt.target.value);
  }

  const onAnonymousChange = (value) => {
    setIsAnonymous(value); // Toggle the state
    
  };
  return (
    <div className="container">
      <span>
      <div style={{ marginBottom: '10px' }}>
          <strong>Title:</strong>&nbsp;&nbsp;&nbsp;
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your question title"
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <strong>Category:</strong>&nbsp;&nbsp;&nbsp;
          <Select
            style={{ width: '200px' }}
            value={category}
            onChange={(value) => onCategoryChange(value)}
            placeholder="Select category"
          >
            <Option value="Lecture">Lecture</Option>
            <Option value="General">General</Option>
            <Option value="Assignment">Assignment</Option>
            <Option value="Exam">Exam</Option>
          </Select>
        </div>

        {user.role === 'student' && (
      <div style={{ marginBottom: '10px' }}>
        <strong>Anonymous</strong>&nbsp;&nbsp;&nbsp;
        <Select
          style={{ width: '200px' }}
          value={isAnonymous}
          onChange={(value) => onAnonymousChange(value)}
          placeholder="Select one option"
        >
          <Option value="No">No</Option>
          <Option value="Yes">Yes</Option>
        </Select>
        <span style={{ fontSize: '12px', color: 'gray', marginLeft: '10px' }}>
          Hide your name from other students
        </span>
      </div>
    )}
    <div style={{ marginBottom: '10px' }}>
        
        <ReactQuill
          modules={modules}
          formats={formats}
          value={disText}
          onChange={setEditorHtml}
          placeholder="Write your question!"
       />
      </div>
     {/* <div className="container" style={{ marginBottom: '10px',border: '1px solid #d9d9d9', borderRadius: '2px', minHeight: '200px' }}>
      <div className="editor-container"><div style={{ marginBottom: '10px' }}>
        <strong>Discussion Text:</strong>
        <ReactQuill
          modules={modules}
          formats={formats}
          value={disText}
          onChange={setDisText}
        />
      </div>
       <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={onEditorStateChange}
            //onEditorStateChange={onTxtChange}
            
            placeholder="Write your question here"
        />
      </div>
      </div> */}
     
      {/* <div classname='container' style={{ marginBottom: '10px' }}>
      <textarea
          rows="4"  // You can adjust the number of rows
          value={disText}
          onChange={onTxtChange}
          placeholder="Write your question here"
          className="txt"
          style={{ whiteSpace: 'pre-line',  marginBottom: '20px' }}
        ></textarea>
        </div>
         */}
        
    <div style={{ textAlign: 'center', width: '200px', margin: 'auto', marginTop: '10px' }}>
      <Button
      className="postButton"
      // type="primary"
      // Set the button style to primary
      style={{ marginBottom: '20px' }}
      onClick={onPost}
      >
        Add Question
      </Button>
    </div>
  </span>
    
      <Feed discussions={discussions} user={user} classname= 'container'/>
      {/* isPrivate={isPrivate} isAnonymous={isAnonymous} */}
    </div>
  )
}

export default DiscussionFeed
