import React, { useState, useEffect } from 'react';
import { Search, Loader2, AlertCircle, ChevronLeft, ChevronRight, ExternalLink, RefreshCw, Filter } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useTheme } from '../context/ThemeContext';
import { usePaginatedAPI, useAPI } from '../hooks/useAPI';

const APIIntegrationEnhanced = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('id'); // 'id', 'title', 'userId'
  const { isDarkMode } = useTheme();

  // Use custom hook for paginated posts
  const {
    data: posts,
    loading,
    error,
    hasMore,
    page,
    fetchPage,
    loadNextPage,
    reset
  } = usePaginatedAPI('https://jsonplaceholder.typicode.com/posts', 10);

  // Use custom hook for user details
  const { data: users } = useAPI('https://jsonplaceholder.typicode.com/users', {
    immediate: true
  });

  // Filter and sort posts
  useEffect(() => {
    if (!posts) return;

    let filtered = posts;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.body.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'userId':
          return a.userId - b.userId;
        case 'id':
        default:
          return a.id - b.id;
      }
    });

    setFilteredPosts(filtered);
  }, [posts, searchQuery, sortBy]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by useEffect above
  };

  // Handle refresh
  const handleRefresh = () => {
    reset();
    setSearchQuery('');
    setSortBy('id');
  };

  // Get user name by ID
  const getUserName = (userId) => {
    if (!users) return 'Loading...';
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Enhanced API Integration
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Advanced API integration with custom hooks, search, filtering, and pagination
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 space-y-4">
          <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <form onSubmit={handleSearch} className="flex-1 max-w-md">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                  <Search className={`absolute left-3 top-2.5 h-5 w-5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-400'
                  }`} />
                </div>
              </form>

              {/* Sort */}
              <div className="flex items-center space-x-2">
                <Filter className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="id">Sort by ID</option>
                  <option value="title">Sort by Title</option>
                  <option value="userId">Sort by User</option>
                </select>
              </div>

              {/* View Mode */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white'
                      : isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === 'list'
                      ? 'bg-blue-600 text-white'
                      : isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  List
                </button>
              </div>

              {/* Refresh */}
              <Button
                onClick={handleRefresh}
                disabled={loading}
                variant="outline"
                size="small"
                className={isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>

            {/* Search Results Info */}
            {searchQuery && (
              <div className={`mt-4 p-3 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-blue-50'
              }`}>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-blue-700'
                }`}>
                  Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} 
                  matching "{searchQuery}"
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Error State */}
        {error && (
          <Card className={`mb-6 ${isDarkMode ? 'bg-red-900 border-red-700' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <div>
                <h3 className="font-medium text-red-800">Error loading posts</h3>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Loading State */}
        {loading && posts.length === 0 && (
          <div className="text-center py-12">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Loading posts...
            </p>
          </div>
        )}

        {/* Posts Display */}
        {!loading && filteredPosts.length > 0 && (
          <div className={`mb-8 ${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
          }`}>
            {filteredPosts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                isDarkMode={isDarkMode} 
                viewMode={viewMode}
                getUserName={getUserName}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredPosts.length === 0 && posts.length > 0 && (
          <Card className={`text-center py-12 ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
            <Search className={`h-12 w-12 mx-auto mb-4 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`} />
            <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              No posts found
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Try adjusting your search terms
            </p>
          </Card>
        )}

        {/* Load More Button */}
        {!loading && hasMore && !searchQuery && (
          <div className="text-center mb-8">
            <Button
              onClick={loadNextPage}
              disabled={loading}
              size="large"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Loading...
                </>
              ) : (
                'Load More Posts'
              )}
            </Button>
          </div>
        )}

        {/* Stats */}
        <div className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <p>
            Showing {filteredPosts.length} of {posts.length} posts
            {searchQuery && ` (filtered from total available)`}
            {hasMore && !searchQuery && ` • More posts available`}
          </p>
        </div>
      </div>
    </div>
  );
};

// Enhanced Post Card Component
const PostCard = ({ post, isDarkMode, viewMode, getUserName }) => {
  const [expanded, setExpanded] = useState(false);

  if (viewMode === 'list') {
    return (
      <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'hover:shadow-lg'}`}>
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              {post.id}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className={`text-lg font-semibold line-clamp-1 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {post.title}
              </h3>
              <span className={`text-xs px-2 py-1 rounded-full ${
                isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
              }`}>
                #{post.id}
              </span>
            </div>
            
            <p className={`text-sm mb-3 line-clamp-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {post.body}
            </p>

            <div className="flex items-center justify-between">
              <span className={`text-xs ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                By {getUserName(post.userId)}
              </span>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className={`text-xs font-medium transition-colors ${
                    isDarkMode 
                      ? 'text-blue-400 hover:text-blue-300' 
                      : 'text-blue-600 hover:text-blue-700'
                  }`}
                >
                  {expanded ? 'Show less' : 'Show more'}
                </button>
                
                <a
                  href={`https://jsonplaceholder.typicode.com/posts/${post.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center space-x-1 text-xs font-medium transition-colors ${
                    isDarkMode 
                      ? 'text-blue-400 hover:text-blue-300' 
                      : 'text-blue-600 hover:text-blue-700'
                  }`}
                >
                  <span>API</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {expanded && (
              <div className={`mt-3 p-3 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {post.body}
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  }

  // Grid view (original card design)
  return (
    <Card className={`h-full flex flex-col ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'hover:shadow-lg'}`}>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className={`text-lg font-semibold line-clamp-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {post.title}
          </h3>
          <span className={`text-xs px-2 py-1 rounded-full ${
            isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
          }`}>
            #{post.id}
          </span>
        </div>
        
        <p className={`text-sm mb-4 line-clamp-3 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {post.body}
        </p>

        <div className={`flex items-center space-x-2 mb-4 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {getUserName(post.userId).charAt(0)}
          </div>
          <span className="text-xs">{getUserName(post.userId)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <span className={`text-xs ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          User #{post.userId}
        </span>
        
        <a
          href={`https://jsonplaceholder.typicode.com/posts/${post.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center space-x-1 text-xs font-medium transition-colors ${
            isDarkMode 
              ? 'text-blue-400 hover:text-blue-300' 
              : 'text-blue-600 hover:text-blue-700'
          }`}
        >
          <span>View API</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </Card>
  );
};

export default APIIntegrationEnhanced; 