import Link from "next/link";
import Image from "next/image";
import { getDictionary } from "~/lib/get-dictionary";

import { Button } from "@saasfly/ui/button";
import * as Icons from "@saasfly/ui/icons";
import { Sparkles, ImageIcon, Eye, Palette, Globe, ChevronDown } from "lucide-react";

import type { Locale } from "~/config/i18n-config";

export default async function IndexPage({
  params: { lang },
}: {
  params: {
    lang: Locale;
  };
}) {
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white text-center py-2 px-4">
        <span className="text-sm">Would you like to switch to 简体中文?</span>
        <button className="ml-2 bg-white text-purple-600 px-3 py-1 rounded text-sm font-medium">
          Yes
        </button>
      </div>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
               <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                 <Sparkles className="w-5 h-5 text-white" />
               </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                ImagePrompt.org
              </span>
            </div>

            {/* Navigation Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#" className="text-purple-600 font-medium border-b-2 border-purple-600 pb-1">
                Home
              </Link>
              <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                Inspiration
              </Link>
              <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                Tutorials
              </Link>
              <div className="relative group">
                 <button className="text-gray-600 hover:text-purple-600 transition-colors flex items-center">
                   Tools
                   <ChevronDown className="w-4 h-4 ml-1" />
                 </button>
               </div>
              <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                Pricing
              </Link>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
               <button className="text-gray-600 hover:text-purple-600">
                 <Icons.Search className="w-5 h-5" />
               </button>
               <button className="text-gray-600 hover:text-purple-600">
                 <Globe className="w-5 h-5" />
               </button>
              <Link href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Create Better AI Art
          </h1>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
            with{" "}
            <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Image Prompt
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Inspire ideas. Enhance image prompt. Create masterpieces
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 rounded-full text-lg font-medium">
              Try it now !
            </Button>
            <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-full text-lg font-medium">
              Tutorials
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Image to Prompt */}
           <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
             <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
               <ImageIcon className="w-6 h-6 text-white" />
             </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Image to Prompt</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Convert image to Prompt to generate your own image
            </p>
          </div>

          {/* Magic Enhance */}
           <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
             <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
               <Sparkles className="w-6 h-6 text-white" />
             </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Magic Enhance</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Transform simple text into detailed, descriptive image prompt
            </p>
          </div>

          {/* AI Describe Image */}
           <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
             <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
               <Eye className="w-6 h-6 text-white" />
             </div>
             <h3 className="text-xl font-bold text-gray-900 mb-3">AI Describe Image</h3>
             <p className="text-gray-600 text-sm leading-relaxed">
               AI help you understand and analyze any image in detail
             </p>
           </div>

           {/* AI Image Generator */}
           <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-purple-100">
             <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
               <Palette className="w-6 h-6 text-white" />
             </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">AI Image Generator</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Transform your image prompts into stunning visuals with AI-powered generation
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">You may be interested in:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#" className="text-purple-600 hover:text-purple-700 underline">
              What is an Image Prompt?
            </Link>
            <Link href="#" className="text-purple-600 hover:text-purple-700 underline">
              How to Write Effective Image Prompts?
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            AI Powered Image Prompt Tools
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A complete suite of AI tools covering every aspect of your image creation journey
          </p>
        </div>
      </section>
    </div>
  );
}
