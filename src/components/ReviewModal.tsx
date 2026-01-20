import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star, Loader2, User, MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"; // Ensure you have shadcn toast or use alert

// Type matching your Mongoose Review Model
interface Review {
  _id: string;
  foodItemName: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewModalProps {
  foodItemName: string;
}

export function ReviewModal({ foodItemName }: ReviewModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Form State
  const [newReview, setNewReview] = useState({
    reviewerName: "",
    rating: 5,
    comment: ""
  });

  const { toast } = useToast();

  // Fetch reviews whenever the modal opens
  useEffect(() => {
    if (isOpen) {
      fetchReviews();
    }
  }, [isOpen]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      // Backend Endpoint: GET /api/reviews/:foodName
      const res = await fetch(`http://localhost:5000/api/reviews/${encodeURIComponent(foodItemName)}`);
      if (res.ok) {
        const data = await res.json();
        // Sort by newest first (optional)
        setReviews(data.reverse());
      }
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Backend Endpoint: POST /api/reviews/add
      const res = await fetch("http://localhost:5000/api/reviews/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          foodItemName, // Passed automatically from parent
          ...newReview
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast({ title: "Review Added", description: "Thanks for your feedback!" });
        setNewReview({ reviewerName: "", rating: 5, comment: "" }); // Reset form
        fetchReviews(); // Refresh list immediately (Real-time feel)
      } else {
        toast({ variant: "destructive", title: "Error", description: data.error || "Failed to add review" });
      }
    } catch (error) {
      console.error("Error submitting review", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 text-xs">
          <MessageSquare className="w-3 h-3" />
          Reviews
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Reviews for <span className="text-primary">{foodItemName}</span>
          </DialogTitle>
        </DialogHeader>

        {/* --- REVIEW LIST AREA --- */}
        <div className="flex-1 overflow-hidden flex flex-col gap-2 mt-2">
          <h3 className="font-semibold text-sm text-muted-foreground">What others say</h3>
          
          <ScrollArea className="h-[200px] rounded-md border p-4 bg-muted/20">
            {loading ? (
              <div className="flex justify-center p-4"><Loader2 className="animate-spin" /></div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No reviews yet.</p>
                <p className="text-xs">Be the first to taste & tell!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev._id} className="border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-3 h-3 text-primary" />
                        </div>
                        <span className="font-medium text-sm">{rev.reviewerName}</span>
                      </div>
                      {/* Star Display */}
                      <div className="flex items-center text-yellow-500">
                        <span className="text-xs font-bold mr-1">{rev.rating}</span>
                        <Star className="w-3 h-3 fill-current" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{rev.comment}</p>
                    <p className="text-[10px] text-muted-foreground mt-2 text-right">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>

        {/* --- ADD REVIEW FORM --- */}
        <div className="border-t pt-4 mt-2">
          <h3 className="font-semibold text-sm mb-3">Write a Review</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            
            {/* Interactive Star Rating */}
            <div className="flex items-center gap-1 mb-2">
              <span className="text-xs text-muted-foreground mr-2">Rate:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className={`transition-all ${star <= newReview.rating ? "text-yellow-500 scale-110" : "text-gray-300"}`}
                >
                  <Star className={`w-6 h-6 ${star <= newReview.rating ? "fill-current" : ""}`} />
                </button>
              ))}
            </div>

            <Input 
              placeholder="Your Name" 
              value={newReview.reviewerName}
              onChange={(e) => setNewReview({...newReview, reviewerName: e.target.value})}
              required
              className="h-9"
            />
            
            <Textarea 
              placeholder="How was the taste? (e.g., Spicy, Sweet, Crispy)" 
              value={newReview.comment}
              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
              required
              rows={2}
              className="resize-none"
            />

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Submit Review"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}