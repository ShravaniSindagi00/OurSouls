'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Heart, MessageCircle, Share2, Users } from 'lucide-react'

const MOCK_POSTS = [
  {
    id: 1,
    author: 'Sarah M.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    title: 'Starting my therapy journey today!',
    content: 'I finally took the step to start therapy after struggling with anxiety for years. Feeling nervous but hopeful. Anyone else starting their journey?',
    likes: 127,
    comments: 23,
    timestamp: '2 hours ago',
    liked: false,
  },
  {
    id: 2,
    author: 'John D.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    title: 'Meditation changed my life',
    content: 'I started with just 5 minutes of meditation each morning and it\'s made such a difference in my anxiety levels. Highly recommend giving it a try!',
    likes: 456,
    comments: 87,
    timestamp: '5 hours ago',
    liked: true,
  },
  {
    id: 3,
    author: 'Maria G.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    title: 'Celebrating 6 months without panic attacks',
    content: 'With the help of my therapist Dr. Sarah and consistent work on coping strategies, I\'ve gone 6 months without a panic attack! Dreams really do come true. Thank you to this supportive community.',
    likes: 892,
    comments: 156,
    timestamp: '1 day ago',
    liked: true,
  },
]

export default function CommunityPage() {
  const [posts, setPosts] = useState(MOCK_POSTS)
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')
  const [showPostForm, setShowPostForm] = useState(false)
  const [liked, setLiked] = useState<{ [key: number]: boolean }>({})

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPostTitle.trim() || !newPostContent.trim()) return

    const newPost = {
      id: posts.length + 1,
      author: 'You',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      title: newPostTitle,
      content: newPostContent,
      likes: 0,
      comments: 0,
      timestamp: 'just now',
      liked: false,
    }

    setPosts([newPost, ...posts])
    setNewPostTitle('')
    setNewPostContent('')
    setShowPostForm(false)
  }

  const toggleLike = (postId: number) => {
    setLiked((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: liked[postId] ? post.likes - 1 : post.likes + 1,
              liked: !liked[postId],
            }
          : post
      )
    )
  }

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Users className="text-primary" size={24} />
          </div>
          <h1 className="text-3xl font-bold">Community Support</h1>
        </div>
        <p className="text-muted-foreground">
          Share your journey, support others, and celebrate wins together
        </p>
      </div>

      {/* Create Post Form */}
      {!showPostForm ? (
        <Card className="p-6 mb-8">
          <h2 className="font-semibold mb-4">Share Your Story</h2>
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
              <span className="text-primary font-semibold">You</span>
            </div>
            <button
              onClick={() => setShowPostForm(true)}
              className="flex-1 px-4 py-3 bg-muted rounded-lg text-muted-foreground text-left hover:bg-muted/80 transition-colors"
            >
              What's on your mind?
            </button>
          </div>
        </Card>
      ) : (
        <Card className="p-6 mb-8">
          <form onSubmit={handleCreatePost}>
            <h2 className="font-semibold mb-4">Share Your Story</h2>
            <div className="space-y-4">
              <Input
                placeholder="Give your post a title"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
              />
              <Textarea
                placeholder="Share your experience, ask for advice, or celebrate a win..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="min-h-32"
              />
            </div>
            <div className="flex gap-2 justify-end mt-4">
              <Button
                variant="outline"
                onClick={() => setShowPostForm(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!newPostTitle.trim() || !newPostContent.trim()}
              >
                Post
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow">
            {/* Post Header */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={post.avatar}
                alt={post.author}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <p className="font-semibold">{post.author}</p>
                <p className="text-sm text-muted-foreground">{post.timestamp}</p>
              </div>
            </div>

            {/* Post Content */}
            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
            <p className="text-foreground/90 mb-4 leading-relaxed">{post.content}</p>

            {/* Post Actions */}
            <div className="flex gap-4 pt-4 border-t border-border">
              <button
                onClick={() => toggleLike(post.id)}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Heart
                  size={18}
                  className={liked[post.id] ? 'fill-primary text-primary' : ''}
                />
                <span className="text-sm">{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle size={18} />
                <span className="text-sm">{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Share2 size={18} />
                <span className="text-sm">Share</span>
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
