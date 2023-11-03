import React from 'react'
import { Card, Button,Tag} from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import { removeComment } from '../../../reducers/discussionReducer'
import { useDispatch } from 'react-redux'
import './../styles.css'

const Comment = ({ cmnt, Luser, dId }) => {
  const dispatch = useDispatch()
  return (
    <Card
      size="small"
      title={
        <span>
          <Avatar src={cmnt.user&&cmnt.user.photo} />
          <span>{' ' + (cmnt.user&&cmnt.user.name)}
          {cmnt.user && cmnt.user.role === 'instructor' ? (
              <Tag color="cyan" style={{ marginLeft: '8px' }}>
                INSTRUCTOR
              </Tag>
            ) : (
              <Tag color="orange" style={{ marginLeft: '8px' }}>
                STUDENT
              </Tag>
            )}
          </span>
          {cmnt.user && cmnt.user._id === Luser._id && (
            <Button
              disabled={!(cmnt.user._id === Luser._id)}
              className="deleteButton"
              onClick={() => {
                dispatch(removeComment(dId, cmnt))
              }}
            >
              delete
            </Button>
          )}
        </span>
      }
    >
     {/* <div className='cmntData'>{cmnt.data}</div> */}
     <div className="cmntData" dangerouslySetInnerHTML={{ __html: cmnt.data }}></div>
    </Card>
  )
}

const AllCommentsData = ({ comments, Luser, dId }) => {
  return comments.map((cmnt) => {
    return <Comment key={cmnt._id} cmnt={cmnt} Luser={Luser} dId={dId} />
  })
}

const AllComments = ({ comments, Luser, dId }) => {
  return (
    <div className="innerCommentcard">
      <AllCommentsData comments={comments} dId={dId} Luser={Luser} />
    </div>
  )
}

export default AllComments
