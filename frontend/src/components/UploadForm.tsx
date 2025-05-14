"use client";

import { useState } from "react";
import { Upload, Calendar } from "lucide-react";
import { FaTiktok, FaYoutube } from "react-icons/fa";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface UploadFormProps {
  setView: (view: "upload" | "list") => void;
}

export default function UploadForm({ setView }: UploadFormProps) {
  const [video, setVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setVideo(file);
    setVideoPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async () => {
    if (!video || !title.trim() || !publishDate || platforms.length === 0) {
      toast.error("Please complete all required fields.");
      return;
    }

    setIsLoading(true);
    try {
      const newPost = {
        id: Date.now().toString(),
        title,
        description,
        publishDate,
        platforms,
        thumbnail: videoPreview || "/placeholder.svg?height=180&width=320",
      };

      // Simulate upload delay
      await new Promise((res) => setTimeout(res, 1500));

      setVideo(null);
      setVideoPreview(null);
      setTitle("");
      setDescription("");
      setPublishDate("");
      setPlatforms([]);

      toast.success("Video scheduled successfully");
      setView("list");
    } catch (err) {
      toast.error("Failed to schedule post.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-8 py-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Upload Video</h2>
        <Button variant="outline" onClick={() => setView("list")}>
          Cancel
        </Button>
      </div>

      <div className="space-y-8">
        {/* Video Upload */}
        <div className="space-y-2">
          <Label htmlFor="video-upload">Video</Label>
          <div
            className={`border rounded-md p-6 text-center ${
              video ? "bg-gray-50" : "border-dashed"
            }`}
          >
            {videoPreview ? (
              <div className="space-y-3">
                <video
                  src={videoPreview}
                  controls
                  className="mx-auto max-h-[240px] rounded"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setVideo(null);
                    setVideoPreview(null);
                  }}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div className="py-8">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">
                  Drag and drop your video here
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    document.getElementById("video-upload")?.click()
                  }
                >
                  Browse files
                </Button>
              </div>
            )}
            <Input
              id="video-upload"
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleVideoChange}
            />
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter video title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your video"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        {/* Publish Date */}
        <div className="space-y-2">
          <Label htmlFor="publish-date">Publish Date & Time</Label>
          <div className="flex items-center">
            <Calendar size={16} className="mr-2 text-gray-400" />
            <Input
              id="publish-date"
              type="datetime-local"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
            />
          </div>
        </div>

        {/* Platforms */}
        <div className="space-y-2">
          <Label>Platforms</Label>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2 border rounded-md p-3">
              <Checkbox
                id="youtube"
                checked={platforms.includes("youtube")}
                onCheckedChange={(checked: boolean) => {
                  setPlatforms((prev) =>
                    checked
                      ? [...prev, "youtube"]
                      : prev.filter((p) => p !== "youtube")
                  );
                }}
              />
              <Label
                htmlFor="youtube"
                className="flex items-center cursor-pointer"
              >
                <FaYoutube size={16} className="mr-2 text-red-500" />
                YouTube
              </Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-md p-3">
              <Checkbox
                id="tiktok"
                checked={platforms.includes("tiktok")}
                onCheckedChange={(checked: boolean) => {
                  setPlatforms((prev) =>
                    checked
                      ? [...prev, "tiktok"]
                      : prev.filter((p) => p !== "tiktok")
                  );
                }}
              />
              <Label
                htmlFor="tiktok"
                className="flex items-center cursor-pointer"
              >
                <FaTiktok size={16} className="mr-2" />
                TikTok
              </Label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Scheduling..." : "Schedule Post"}
          </Button>
        </div>
      </div>
    </div>
  );
}
