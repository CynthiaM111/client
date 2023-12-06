// import DiscussionCard from './components/discussionCard'
// import './styles.css'
// import { EditorState, convertToRaw, ContentState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'



// import { useSelector, useDispatch } from 'react-redux'
// import React, { useState, useEffect } from 'react'
// import { Button, Input, Select, Space, Checkbox, Typography } from 'antd'


// import {
//   addDiscussion,
//   getAllDiscussions
// } from '../../reducers/discussionReducer'

// const { Text } = Typography;

// const { Option } = Select;

// const modules = {
//   toolbar: [
//     [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
//     [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//     ['bold', 'italic', 'underline'],
//     ['link', 'image'],
//   ],
// };

// const formats = [
//   'header',
//   'font',
//   'list',
//   'bold',
//   'italic',
//   'underline',
//   'link',
//   'image',
// ];


// const Feed = ({ discussions, user }) => {
//   return discussions.map((dis) => {
//     return <DiscussionCard key={dis._id} discussion={dis} user={user} />
//   })
// }


// const DiscussionFeed = ({ courseId }) => {
//   const {Option} =Select
//   const dispatch = useDispatch()
//   useEffect(() => {
//     dispatch(getAllDiscussions(courseId))
//   }, [dispatch, courseId])
//   const user = useSelector((state) => state.auth.user)
//   const discussions = useSelector((state) => state.discussions)
//   const [disText, setDisText] = useState('')
//   const [category, setCategory] = useState('Lecture');
//   const [title, setTitle] = useState('')
//   const [isAnonymous, setIsAnonymous] = useState('No');
//   const [isPrivate, setIsPrivate] = useState('No');
//   //const [editorState, setEditorState] = useState(EditorState.createEmpty());


//   const setEditorHtml = (html) => {
//     setDisText(html);
//   };

//   const onPost =  () => {
//     if (disText !== ''){
//       //const contentState = editorState.getCurrentContent();
//       //const rawContentState = convertToRaw(contentState);

    
//       dispatch(addDiscussion(courseId, disText, category, title, isAnonymous,isPrivate ))
//       setTitle('')
//       setDisText('')
//     // setEditorState(EditorState.createEmpty());
//   } else {console.log('cannot post an empty post')
//   }}
  
//   const onTxtChange = (txt) => {
//     setDisText(txt.target.value)
//   }
//   // const onEditorStateChange = (editorState) => {
//   //   setEditorState(editorState);
//   // };
//   const onCategoryChange = (value) => {
//     setCategory(value);
//   };

//   const onTitleChange =(txt) => {
//     setTitle(txt.target.value);
//   }

//   const onAnonymousChange = (value) => {
//     setIsAnonymous(value); // Toggle the state
    
//   };
//   const onPrivateChange = (value) => {
//     setIsPrivate(value); // Toggle the state
    
//   };
//   return (
//     <div className="container">
//       <span>
//       <div style={{ marginBottom: '10px' }}>
//           <strong>Title:</strong>&nbsp;&nbsp;&nbsp;
//           <Input
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Enter your question title"
//           />
//         </div>

//         <div style={{ marginBottom: '10px' }}>
//           <strong>Category:</strong>&nbsp;&nbsp;&nbsp;
//           <Select
//             style={{ width: '200px' }}
//             value={category}
//             onChange={(value) => onCategoryChange(value)}
//             placeholder="Select category"
//           >
//             <Option value="Lecture">Lecture</Option>
//             <Option value="General">General</Option>
//             <Option value="Assignment">Assignment</Option>
//             <Option value="Exam">Exam</Option>
//           </Select>
//         </div>
// {/* 
//         {user.role === 'student' && (
//       <div style={{ marginBottom: '10px' }}>
//         <strong>Anonymous</strong>&nbsp;&nbsp;&nbsp;
//         <Select
//           style={{ width: '200px' }}
//           value={isAnonymous}
//           onChange={(value) => onAnonymousChange(value)}
//           placeholder="Select one option"
//         >
//           <Option value="No">No</Option>
//           <Option value="Yes">Yes</Option>
//         </Select>
//         <span style={{ fontSize: '12px', color: 'gray', marginLeft: '10px' }}>
//           Hide your name from other students
//         </span>
//       </div> */}
//       {user.role === 'student' && (
//       <div>
//         <div style={{ marginBottom: '10px' }}>
//           <strong>Anonymous</strong>&nbsp;&nbsp;&nbsp;
//           <Select
//             style={{ width: '200px' }}
//             value={isAnonymous}
//             onChange={(value) => onAnonymousChange(value)}
//             placeholder="Select one option"
//           >
//             <Option value="No">No</Option>
//             <Option value="Yes">Yes</Option>
//           </Select>
//           <span style={{ fontSize: '12px', color: 'gray', marginLeft: '10px' }}>
//             Hide your name from other students
//           </span>
//         </div>

//         <div style={{ marginBottom: '10px' }}>
//           <strong>Private</strong>&nbsp;&nbsp;&nbsp;
//           <Select
//             style={{ width: '200px' }}
//             value={isPrivate}
//             onChange={(value) => onPrivateChange(value)}
//             placeholder="Select one option"
//           >
//             <Option value="No">No</Option>
//             <Option value="Yes">Yes</Option>
//           </Select>
//           <span style={{ fontSize: '12px', color: 'gray', marginLeft: '10px' }}>
//             Talk to your professor in private
//           </span>
//         </div>
//       </div>
//     )}
//   </span>
// </div>
      

//     {/* )} */}
//     <div style={{ marginBottom: '10px' }}>
        
//         <ReactQuill
//           modules={modules}
//           formats={formats}
//           value={disText}
//           onChange={setEditorHtml}
//           placeholder="Write your question!"
//        />
//       </div>
     
        
//     <div style={{ textAlign: 'center', width: '200px', margin: 'auto', marginTop: '10px' }}>
//       <Button
//       className="postButton"
//       // type="primary"
//       // Set the button style to primary
//       style={{ marginBottom: '20px' }}
//       onClick={onPost}
//       >
//         Add Question
//       </Button>
//     </div>
//   </span>
    
//       <Feed discussions={discussions} user={user} classname= 'container'/>
//       {/* isPrivate={isPrivate} isAnonymous={isAnonymous} */}
//     </div>
//   )
// }

// export default DiscussionFeed
import DiscussionCard from './components/discussionCard';
import './styles.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Button, Input, Select, Typography } from 'antd';
import {
  addDiscussion,
  getAllDiscussions
} from '../../reducers/discussionReducer';

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
  const filteredDiscussions = discussions.filter(
    (dis) => !(dis.isPrivate === 'Yes' && user.role === 'student' && dis.user._id !== user._id && user.role !== 'instructor')
  );

  return filteredDiscussions.map((dis) => {
    return <DiscussionCard key={dis._id} discussion={dis} user={user} />;
  });
};
            

const DiscussionFeed = ({ courseId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDiscussions(courseId));
  }, [dispatch, courseId]);

  const user = useSelector((state) => state.auth.user);
  const discussions = useSelector((state) => state.discussions);
  const [disText, setDisText] = useState('');
  const [category, setCategory] = useState('Lecture');
  const [title, setTitle] = useState('');
  const [isAnonymous, setIsAnonymous] = useState('No');
  const [isPrivate, setIsPrivate] = useState('No');

  const setEditorHtml = (html) => {
    setDisText(html);
  };

  const onPost = () => {
    if (disText !== '') {
      dispatch(addDiscussion(courseId, disText, category, title, isAnonymous, isPrivate));
      setTitle('');
      setDisText('');
    } else {
      console.log('Cannot post an empty post');
    }
  };

  const onTxtChange = (txt) => {
    setDisText(txt.target.value);
  };

  const onCategoryChange = (value) => {
    setCategory(value);
  };

  const onTitleChange = (txt) => {
    setTitle(txt.target.value);
  };

  const onAnonymousChange = (value) => {
    setIsAnonymous(value);
  };

  const onPrivateChange = (value) => {
    setIsPrivate(value);
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
          <div>
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

            <div style={{ marginBottom: '10px' }}>
              <strong>Private</strong>&nbsp;&nbsp;&nbsp;
              <Select
                style={{ width: '200px' }}
                value={isPrivate}
                onChange={(value) => onPrivateChange(value)}
                placeholder="Select one option"
              >
                <Option value="No">No</Option>
                <Option value="Yes">Yes</Option>
              </Select>
              <span style={{ fontSize: '12px', color: 'gray', marginLeft: '10px' }}>
                Talk to your professor in private
              </span>
            </div>
          </div>
        )}
      </span>
      <div style={{ marginBottom: '10px' }}>
        <ReactQuill
          modules={modules}
          formats={formats}
          value={disText}
          onChange={setEditorHtml}
          placeholder="Write your question!"
        />
      </div>
      <div style={{ textAlign: 'center', width: '200px', margin: 'auto', marginTop: '10px' }}>
        <Button
          className="postButton"
          style={{ marginBottom: '20px' }}
          onClick={onPost}
        >
          Add Question
        </Button>
      </div>
      <Feed discussions={discussions} user={user} classname='container' />
    </div>
  );
};

export default DiscussionFeed;
