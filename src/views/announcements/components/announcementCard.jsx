import React from 'react'
import { Card, Button, Tag} from 'antd'
import { useDispatch } from 'react-redux'
import Meta from 'antd/lib/card/Meta'
import Avatar from 'antd/lib/avatar/avatar'
import { removeAnnouncement } from '../../../reducers/announcementsReducer'

const AnnouncementCard = ({ announcement, user }) => {
  const dispatch = useDispatch()

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
    const content = announcement.data;
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
        className="custom-card"
        title={announcement.user ? (
          <div>
           
            <Meta
              avatar={<Avatar src={announcement.user.photo} />}
              title={
                <span>
                { announcement.user.name}
               
               {announcement.user.role === 'instructor' ? (
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
            {announcement.user._id === user._id && (
              <Button
                disabled={!(announcement.user._id === user._id)}
                className="deleteButton"
                onClick={() => {
                  dispatch(removeAnnouncement(announcement._id))
                }}
              >
                delete
              </Button>
            )}
          </div>
   ):( <div>User information not available</div>
   )}
      >
        <div>
          <span style={{ fontWeight: 'bold', marginBottom: '5px', fontSize: '18px' }}>
            {announcement.title}
          </span>
          </div>
          <div style={{ fontSize: '12px', fontWeight: 'italic',color: 'green', marginTop: '5px' }}>
          {formatDate(announcement.createdAt)} 
        </div>
        {renderAnnouncementContent()}
        {/* <div className="annData"></div> */}
      </Card>
    </div>
  )
}

export default AnnouncementCard
