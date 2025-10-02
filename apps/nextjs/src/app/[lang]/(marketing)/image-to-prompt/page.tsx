"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@saasfly/ui/button";
import { 
  Sparkles, 
  ImageIcon, 
  Eye, 
  Palette, 
  Globe, 
  ChevronDown,
  Upload,
  FileText,
  Check,
  Search
} from "lucide-react";

export default function ImageToPromptPage() {
  const [activeTab, setActiveTab] = useState("image-to-prompt");
  const [selectedModel, setSelectedModel] = useState("general");
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const models = [
    {
      id: "general",
      name: "General Image Prompt",
      description: "Natural language description of the image",
      icon: <Check className="w-4 h-4" />
    },
    {
      id: "flux",
      name: "Flux",
      description: "Optimized for state-of-the-art Flux AI models, concise, natural language",
      icon: <Sparkles className="w-4 h-4" />
    },
    {
      id: "midjourney",
      name: "Midjourney",
      description: "Tailored for Midjourney generation with Midjourney parameters",
      icon: <ImageIcon className="w-4 h-4" />
    },
    {
      id: "stable-diffusion",
      name: "Stable Diffusion",
      description: "Formatted for Stable Diffusion models",
      icon: <Eye className="w-4 h-4" />
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGeneratePrompt = async () => {
    if (!uploadedFile) {
      alert("请先上传一张图片");
      return;
    }

    setIsGenerating(true);
    setGeneratedPrompt("");

    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);
      formData.append('language', selectedLanguage === 'chinese' ? 'zh' : 'en');

      const response = await fetch('/api/image-to-prompt', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setGeneratedPrompt(result.prompt);
      } else {
        throw new Error(result.error || '生成提示词失败');
      }
    } catch (error) {
      console.error('生成提示词错误:', error);
      alert(error instanceof Error ? error.message : '生成提示词时发生错误，请稍后重试');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-100 to-purple-200 px-4 py-2 text-center text-sm">
        <span className="text-gray-700">Would you like to switch to </span>
        <span className="font-medium text-purple-700">简体中文</span>
        <span className="text-gray-700">? </span>
        <Button variant="ghost" size="sm" className="ml-2 h-6 bg-purple-600 text-white hover:bg-purple-700">
          是的
        </Button>
      </div>

      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600">
                  <ImageIcon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">ImagePrompt.org</span>
              </Link>
              
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/" className="text-gray-700 hover:text-purple-600">Home</Link>
                <Link href="/inspiration" className="text-gray-700 hover:text-purple-600">Inspiration</Link>
                <Link href="/tutorials" className="text-gray-700 hover:text-purple-600">Tutorials</Link>
                <div className="flex items-center space-x-1 text-gray-700 hover:text-purple-600">
                  <span>Tools</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
                <Link href="/pricing" className="text-gray-700 hover:text-purple-600">Pricing</Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Globe className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="default" size="sm" className="bg-purple-600 hover:bg-purple-700">
                Login
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Free Image to Prompt Generator
          </h1>
          <p className="text-lg text-gray-600">
            Convert Image to Prompt to generate your own image
          </p>
        </div>

        {/* Main Container - Unified Area */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-8 mb-8 max-w-6xl mx-auto">
          {/* Top Level Tabs - Highest Priority */}
          <div className="flex justify-start mb-6">
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setActiveTab("image-to-prompt")}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === "image-to-prompt"
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <ImageIcon className="h-4 w-4" />
                <span>Image to Prompt</span>
              </button>
              <button
                onClick={() => setActiveTab("text-to-prompt")}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-colors border-l border-gray-200 ${
                  activeTab === "text-to-prompt"
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>Text to Prompt</span>
              </button>
            </div>
          </div>

          {/* Main Content Area with Local Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Left Side - Upload Area with Controls */}
            <div className="flex flex-col h-full">
              {/* Upload Controls */}
              <div className="flex items-center space-x-4 h-[40px] mb-3">
                <Button 
                  variant="default" 
                  className="bg-purple-600 hover:bg-purple-700 text-sm"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  Upload Image
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="text-sm text-gray-500">Input Image URL</div>
              </div>
              
              {/* Upload Area */}
              <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center bg-white min-h-[280px] flex items-center justify-center flex-1">
                {uploadedImage ? (
                  <img 
                    src={uploadedImage} 
                    alt="Uploaded" 
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2">Upload a photo or drag and drop</p>
                    <p className="text-sm text-gray-400">PNG, JPG or WEBP up to 4MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Preview Area with Label */}
            <div className="flex flex-col h-full">
              {/* Preview Controls - Matching left side height */}
              <div className="flex items-center space-x-4 h-[40px] mb-3">
                <div className="text-sm font-medium text-gray-700">Image Preview</div>
              </div>
              
              {/* Preview Area */}
              <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center bg-white min-h-[280px] flex items-center justify-center flex-1">
                {uploadedImage ? (
                  <img 
                    src={uploadedImage} 
                    alt="Preview" 
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Your image will show here</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Model Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select AI Model</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {models.map((model) => (
                <div
                  key={model.id}
                  onClick={() => setSelectedModel(model.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors bg-white ${
                    selectedModel === model.id
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    {model.icon}
                    <h4 className="font-medium text-sm text-black text-left">{model.name}</h4>
                    {selectedModel === model.id && (
                      <Check className="h-4 w-4 text-purple-600 ml-auto" />
                    )}
                  </div>
                  <p className="text-xs text-black leading-relaxed text-left">{model.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Language Selection and Generate Button */}
          <div className="flex flex-col items-start gap-6 mb-8">
            <div className="flex items-center justify-start space-x-4">
              <label className="text-sm font-medium text-gray-700">Prompt Language:</label>
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 bg-white text-sm min-w-[120px]"
              >
                <option value="english">English</option>
                <option value="chinese">中文</option>
                <option value="spanish">Español</option>
                <option value="french">Français</option>
              </select>
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              <Button 
                onClick={handleGeneratePrompt}
                className="bg-purple-600 hover:bg-purple-700 px-8 py-2"
                disabled={!uploadedImage || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  'Generate Prompt'
                )}
              </Button>
              <Button 
                variant="outline"
                className="text-purple-600 border-purple-600 hover:bg-purple-50 bg-white px-6 py-2"
              >
                View History
              </Button>
            </div>
          </div>

          {/* Generated Prompt Area */}
          <div>
            <div className="border border-gray-300 rounded-lg p-6 bg-gray-50 min-h-[120px]">
              <p className="text-gray-600 text-sm leading-relaxed">
                {generatedPrompt || "Generated prompt will appear here"}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center mb-12 max-w-5xl mx-auto">
          <p className="text-gray-700 text-sm">
            Want to analyze specific aspects like art style or describe people in the image? Try our{" "}
            <Link href="/ai-describe-image" className="text-blue-600 hover:underline font-medium">
              AI Describe Image
            </Link>
            {" "}tool for detailed analysis
          </p>
        </div>

        {/* Final Section */}
        <div className="text-center mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Highly Accurate Image to Prompt Generation
          </h2>
          <p className="text-base text-gray-600">
            Convert original images to prompts and regenerated with AI to see our prompt accuracy
          </p>
        </div>
      </div>
    </div>
  );
}