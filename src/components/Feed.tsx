import React from 'react';
import Post from './Post';
import { posts } from '../data/posts';
import { AnalyticsHook } from '../hooks/useAnalytics';

interface FeedProps {
  analytics: AnalyticsHook;
}

const Feed: React.FC<FeedProps> = ({ analytics }) => {
  return (
    <div className="w-full max-w-[470px] mx-auto lg:mx-0">
      {posts.map((post) => (
        <Post
          key={post.id}
          username={post.username}
          userImage={post.userImage}
          location={post.location}
          media={post.media}
          caption={post.caption}
          likes={post.likes}
          timestamp={post.timestamp}
          comments={post.comments}
          analytics={analytics} // ✅ 傳遞給 Post 使用
        />
      ))}
    </div>
  );
};

export default Feed;
