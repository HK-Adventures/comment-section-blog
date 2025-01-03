'use client'

import { useState } from 'react'
import CommentForm from './CommentForm'
import { formatDistanceToNow } from 'date-fns'

interface Comment {
  _id: string
  name: string
  comment: string
  createdAt: string
  parentComment?: string
}

interface CommentsProps {
  postId: string
  comments: Comment[]
}

export default function Comments({ postId, comments }: CommentsProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [localComments, setLocalComments] = useState(comments)

  const parentComments = localComments.filter(comment => !comment.parentComment)
  
  const getChildComments = (parentId: string) => {
    return localComments.filter(comment => comment.parentComment === parentId)
  }

  const handleCommentSuccess = () => {
    fetchComments()
    setReplyingTo(null)
  }

  const fetchComments = async () => {
    const res = await fetch(`/api/comments?postId=${postId}`)
    const data = await res.json()
    setLocalComments(data)
  }

  const renderComment = (comment: Comment, depth = 0) => {
    const childComments = getChildComments(comment._id)

    return (
      <div key={comment._id} className={`${depth > 0 ? 'ml-8' : ''} mb-4`}>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold">{comment.name}</h4>
              <p className="text-gray-600 text-sm">
                {formatDistanceToNow(new Date(comment.createdAt))} ago
              </p>
            </div>
            <button
              onClick={() => setReplyingTo(comment._id)}
              className="text-blue-500 text-sm hover:underline"
            >
              Reply
            </button>
          </div>
          <p className="mt-2">{comment.comment}</p>
        </div>

        {replyingTo === comment._id && (
          <div className="mt-4 ml-8">
            <CommentForm
              postId={postId}
              parentCommentId={comment._id}
              onSuccess={handleCommentSuccess}
            />
          </div>
        )}

        {childComments.map(childComment => renderComment(childComment, depth + 1))}
      </div>
    )
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Comments</h3>
      <CommentForm postId={postId} onSuccess={handleCommentSuccess} />
      
      <div className="mt-8">
        {parentComments.map(comment => renderComment(comment))}
      </div>
    </div>
  )
} 