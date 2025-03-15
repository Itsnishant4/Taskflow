import React from 'react';
import { GithubIcon, TwitterIcon, DiscordIcon } from './SocialIcons';
import { CodeIcon } from '@heroicons/react/outline';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <CodeIcon className="h-8 w-8 text-indigo-400" />
                            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                                AI DevSuite
                            </span>
                        </div>
                        <p className="text-sm">Empowering developers with AI-driven tools to build better, faster, and smarter.</p>
                    </div>

                    {/* Links */}
                    <div className="space-y-2">
                        <h3 className="text-white font-medium mb-2">Product</h3>
                        <a href="#" className="block text-sm hover:text-indigo-400">Features</a>
                        <a href="#" className="block text-sm hover:text-indigo-400">Documentation</a>
                        <a href="#" className="block text-sm hover:text-indigo-400">Pricing</a>
                    </div>

                    {/* Resources */}
                    <div className="space-y-2">
                        <h3 className="text-white font-medium mb-2">Resources</h3>
                        <a href="#" className="block text-sm hover:text-indigo-400">Blog</a>
                        <a href="#" className="block text-sm hover:text-indigo-400">Support</a>
                        <a href="#" className="block text-sm hover:text-indigo-400">API Status</a>
                    </div>

                    {/* Social */}
                    <div className="space-y-2">
                        <h3 className="text-white font-medium mb-2">Connect</h3>
                        <div className="flex space-x-4">
                            <GithubIcon className="h-6 w-6 hover:text-indigo-400 cursor-pointer" />
                            <TwitterIcon className="h-6 w-6 hover:text-indigo-400 cursor-pointer" />
                            <DiscordIcon className="h-6 w-6 hover:text-indigo-400 cursor-pointer" />
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} AI DevSuite. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;