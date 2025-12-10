"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Users, MessageSquare, ThumbsUp, Send } from "lucide-react"

interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  likes: number
  timeAgo: string
}

const mockComments: Comment[] = [
  {
    id: "1",
    author: "Maria G.",
    avatar: "/latina-professional-woman.png",
    content:
      "During the last hurricane, we found that having a designated meeting point for the family was crucial. Make sure everyone knows where to go!",
    likes: 24,
    timeAgo: "2 hours ago",
  },
  {
    id: "2",
    author: "James W.",
    avatar: "/professional-man-business.png",
    content:
      "Pro tip: Keep copies of important documents in a waterproof bag inside your go-bag. Saved us a lot of trouble during the flood.",
    likes: 18,
    timeAgo: "5 hours ago",
  },
  {
    id: "3",
    author: "Sarah C.",
    avatar: "/professional-asian-woman.png",
    content:
      "Don't forget about your pets! We have a separate emergency kit for our dog including food, water bowl, and vaccination records.",
    likes: 31,
    timeAgo: "1 day ago",
  },
]

export function CommunityForum() {
  const [comments, setComments] = useState(mockComments)
  const [newComment, setNewComment] = useState("")

  const handleSubmit = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      author: "You",
      avatar: "",
      content: newComment,
      likes: 0,
      timeAgo: "Just now",
    }

    setComments([comment, ...comments])
    setNewComment("")
  }

  const handleLike = (id: string) => {
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c)))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-chart-2" />
          Community Tips
        </CardTitle>
        <CardDescription>Share and learn from your community's experiences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* New comment form */}
        <div className="space-y-3">
          <Textarea
            placeholder="Share your disaster preparedness tip..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[80px]"
          />
          <Button onClick={handleSubmit} className="gap-2" disabled={!newComment.trim()}>
            <Send className="h-4 w-4" />
            Share Tip
          </Button>
        </div>

        {/* Comments list */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="p-4 rounded-lg border bg-card">
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {comment.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground">{comment.author}</span>
                    <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                  </div>
                  <p className="text-sm text-foreground mb-3">{comment.content}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-2 text-muted-foreground hover:text-foreground"
                    onClick={() => handleLike(comment.id)}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{comment.likes}</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full bg-transparent">
          <MessageSquare className="h-4 w-4 mr-2" />
          View All Community Tips
        </Button>
      </CardContent>
    </Card>
  )
}
