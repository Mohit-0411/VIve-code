'use me' // or 'use client'
'use client';

import { useState, useTransition } from 'react';
import { toggleLike, addComment } from '@/app/actions/forum';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
}

interface ForumInteractivityProps {
  postId: string;
  userId: string;
  userName: string;
  initialLikes: number;
  initialComments: Comment[];
}

export default function ForumInteractivity({
  postId,
  userId,
  userName,
  initialLikes,
  initialComments,
}: ForumInteractivityProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [commentText, setCommentText] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleLike = () => {
    // Optimistic UI update
    setLikes((prev) => prev + 1);
    
    startTransition(async () => {
      await toggleLike(postId, userId);
    });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: Math.random().toString(),
      userId,
      userName,
      text: commentText,
      createdAt: new Date().toISOString(),
    };

    setComments((prev) => [...prev, newComment]);
    const textToSend = commentText;
    setCommentText('');

    startTransition(async () => {
      await addComment(postId, userId, userName, textToSend);
    });
  };

  return (
    <div className="mt-8 space-y-6">
      {/* Like Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleLike}
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-150 disabled:opacity-50"
        >
          ❤️ Like ({likes})
        </button>
      </div>

      {/* Comment Input */}
      <form onSubmit={handleAddComment} className="flex gap-2">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white dark:bg-zinc-800"
        />
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-zinc-800 dark:bg-zinc-100 dark:text-black rounded-lg hover:opacity-90 transition"
        >
          Post
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-3">
        {comments.map((c) => (
          <div key={c.id} className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
            <div className="flex justify-between items-center text-xs text-zinc-500 mb-1">
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">{c.userName}</span>
              <span>{new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}