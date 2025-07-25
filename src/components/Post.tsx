import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Play, Volume2, VolumeX } from 'lucide-react';
import { useAnalytics } from '../hooks/useAnalytics';
import { AnalyticsHook } from '../hooks/useAnalytics';

interface Comment {
  username: string;
  text: string;
}

interface PostProps {
  username: string;
  userImage: string;
  location?: string;
  media?: {
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
  };
  caption: string;
  likes: number;
  timestamp: string;
  comments: Comment[];
  analytics: AnalyticsHook;
}

const Post: React.FC<PostProps> = ({
  username,
  userImage,
  location,
  media,
  caption,
  likes,
  timestamp,
  comments,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [comment, setComment] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const postRef = useRef<HTMLDivElement>(null);
  const viewStartTime = useRef<number>(Date.now());
  const hasTrackedView = useRef(false);
  
  const { ensureSession, trackInteraction, trackPostView } = useAnalytics(); 
  const postId = `${username}_${caption.slice(0, 20).replace(/\s+/g, '_')}`;

  const handleLike = async () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    await trackInteraction(
      newLikedState ? 'like' : 'unlike', 
      postId, 
      username,
      { previous_likes: likes }
    );
  };

  const handleSave = async () => {
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);
    await trackInteraction(
      newSavedState ? 'save' : 'unsave', 
      postId, 
      username
    );
  };

  const handleShare = async () => {
    await trackInteraction('share', postId, username);
    console.log('Share clicked');
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      await trackInteraction('comment', postId, username, {
        comment_text: comment,
        comment_length: comment.length
      });
      setComment('');
      console.log('Comment posted:', comment);
    }
  };

  const toggleComments = async () => {
    const newShowAllState = !showAllComments;
    setShowAllComments(newShowAllState);
    if (newShowAllState) {
      await trackInteraction('view_all_comments', postId, username, {
        total_comments: comments.length
      });
    }
  };

  const togglePlay = async () => {
    if (videoRef.current) {
      const newPlayingState = !isPlaying;
      if (newPlayingState) {
        videoRef.current.play();
        await trackInteraction('play_video', postId, username);
      } else {
        videoRef.current.pause();
        await trackInteraction('pause_video', postId, username);
      }
      setIsPlaying(newPlayingState);
    }
  };

  const toggleMute = async () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      await trackInteraction(
        newMutedState ? 'mute_video' : 'unmute_video', 
        postId, 
        username
      );
    }
  };

  const handleMediaDoubleClick = async () => {
    await handleLike();
    await trackInteraction('double_tap_like', postId, username);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting && !hasTrackedView.current) {
            await ensureSession();  // ✅ 確保 session 建立（含 UUID）
            hasTrackedView.current = true;
            viewStartTime.current = Date.now();
          } else if (!entry.isIntersecting && hasTrackedView.current) {
            const viewDuration = (Date.now() - viewStartTime.current) / 1000;
            const scrollPercentage = Math.round(
              (entry.boundingClientRect.top / window.innerHeight) * 100
            );
            trackPostView(
              postId,
              username,
              viewDuration,
              Math.abs(scrollPercentage),
              (media?.type as 'image' | 'video') || 'image'  // ✅ 修正重點：強制轉型
            );
          }
        });
      },
      { threshold: 0.5 }
    );

    if (postRef.current) observer.observe(postRef.current);
    return () => {
      if (postRef.current) observer.unobserve(postRef.current);
    };
  }, [postId, username, media?.type, trackPostView, ensureSession]);

  const displayedComments = showAllComments ? comments : comments.slice(0, 2);

  return (
    <div ref={postRef} className="bg-white border border-gray-200 rounded-lg mb-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img src={userImage} alt={username} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-semibold text-sm">{username}</p>
            {location && <p className="text-xs text-gray-500">{location}</p>}
          </div>
        </div>
        <MoreHorizontal 
          className="h-5 w-5 text-gray-500 cursor-pointer" 
          onClick={async () => await trackInteraction('menu_click', postId, username)}
        />
      </div>

      {/* Media */}
      {media && (
        <div className="w-full aspect-square bg-black flex items-center justify-center overflow-hidden relative">
          {media.type === 'image' ? (
            <img 
              src={media.url} 
              alt="Post" 
              className="w-full h-full object-cover"
              onDoubleClick={handleMediaDoubleClick}
            />
          ) : (
            <div className="relative w-full h-full" onClick={togglePlay}>
              <video
                ref={videoRef}
                src={media.url}
                poster={media.thumbnail}
                className="w-full h-full object-cover"
                loop
                muted={isMuted}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <Play className="w-16 h-16 text-white" />
                </div>
              )}
              <button
                className="absolute bottom-4 right-4 p-2 bg-black bg-opacity-50 rounded-full text-white"
                onClick={async (e) => {
                  e.stopPropagation();
                  await toggleMute();
                }}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="p-3">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <Heart 
              className={`h-6 w-6 cursor-pointer transition-transform hover:scale-110 ${isLiked ? 'fill-red-500 text-red-500' : 'text-black'}`} 
              onClick={handleLike}
            />
            <MessageCircle 
              className="h-6 w-6 cursor-pointer transition-transform hover:scale-110" 
              onClick={async () => await trackInteraction('comment_click', postId, username)}
            />
            <Send 
              className="h-6 w-6 cursor-pointer transition-transform hover:scale-110" 
              onClick={handleShare}
            />
          </div>
          <Bookmark 
            className={`h-6 w-6 cursor-pointer transition-transform hover:scale-110 ${isSaved ? 'fill-black' : ''}`} 
            onClick={handleSave}
          />
        </div>

        <p className="font-semibold text-sm mt-2">{likes + (isLiked ? 1 : 0)} likes</p>

        <div className="mt-1">
          <p className="text-sm">
            <span className="font-semibold">{username}</span> {caption}
          </p>
        </div>

        {comments.length > 0 && (
          <div className="mt-2">
            {comments.length > 2 && !showAllComments && (
              <button 
                className="text-sm text-gray-500 mb-1"
                onClick={toggleComments}
              >
                View all {comments.length} comments
              </button>
            )}
            {displayedComments.map((comment, index) => (
              <div key={index} className="text-sm mb-1">
                <span className="font-semibold">{comment.username}</span> {comment.text}
              </div>
            ))}
            {showAllComments && comments.length > 2 && (
              <button 
                className="text-sm text-gray-500 mt-1"
                onClick={toggleComments}
              >
                Show less
              </button>
            )}
          </div>
        )}

        <p className="text-xs text-gray-500 mt-1">{timestamp}</p>

        <div className="mt-3 border-t border-gray-200 pt-3">
          <form className="flex items-center" onSubmit={handleComment}>
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 text-sm border-none focus:ring-0 focus:outline-none"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onFocus={async () => await trackInteraction('comment_input_focus', postId, username)}
            />
            {comment.length > 0 && (
              <button 
                type="submit" 
                className="text-blue-500 font-semibold text-sm"
              >
                Post
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Post;
