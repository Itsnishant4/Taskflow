import React, { useState } from 'react';
import { CodeIcon, BeakerIcon } from '@heroicons/react/outline';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center space-x-2">
                        <CodeIcon className="h-8 w-8 text-indigo-600" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            AI DevSuite
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 font-medium">
                            Features
                        </a>
                        <a href="#about" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 font-medium">
                            About
                        </a>
                        <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity duration-200 flex items-center">
                            <BeakerIcon className="w-5 h-5 mr-2" />
                            Export Code
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-md text-gray-600 hover:text-indigo-600"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 space-y-4">
                        <a href="#features" className="block text-gray-600 hover:text-indigo-600">
                            Features
                        </a>
                        <a href="#about" className="block text-gray-600 hover:text-indigo-600">
                            About
                        </a>
                        <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg">
                            Export Code
                        </button>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;