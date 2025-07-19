import React, { useState, useEffect, useCallback } from 'react';
import { Search, Loader2, AlertCircle, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useTheme } from '../context/ThemeContext';

const APIIntegration = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const { isDarkMode } = useTheme();

  const POSTS_PER_PAGE = 10;
  const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

  // Fetch posts from API
  const fetchPosts = useCallback(async (page = 1, append = false) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/posts?_page=${page}&_limit=${POSTS_PER_PAGE}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const totalCount = response.headers.get('X-Total-Count');
      const totalPagesCount = Math.ceil(totalCount / POSTS_PER_PAGE);

      setTotalPages(totalPagesCount);
      setHasMore(page < totalPagesCount);

      if (append) {
        setPosts(prevPosts => [...prevPosts, ...data]);
      } else {
        setPosts(data);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch user details for a post
  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      console.error('Error fetching user details:', err);
    }
    return null;
  };

  // Load initial data
  useEffect(() => {
    fetchPosts(1);
  }, [fetchPosts]);

  // Filter posts based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.body.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [posts, searchQuery]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by useEffect above
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchPosts(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle infinite scroll
  const handleLoadMore = () => {
    if (hasMore && !loading) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchPosts(nextPage, true);
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    setCurrentPage(1);
    setSearchQuery('');
    fetchPosts(1);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            API Integration Demo
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Fetching posts from JSONPlaceholder API with search, pagination, and infinite scroll
          </p>
        </div>

        {/* Search and Controls */}
        <div className="mb-8">
          <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              {/* Search Form */}
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

              {/* Controls */}
              <div className="flex items-center space-x-2">
                <Button
                  onClick={handleRefresh}
                  disabled={loading}
                  variant="outline"
                  size="small"
                  className={isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  Refresh
                </Button>
              </div>
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

        {/* Posts Grid */}
        {!loading && filteredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} isDarkMode={isDarkMode} />
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

        {/* Pagination */}
        {!loading && !searchQuery && posts.length > 0 && (
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              variant="outline"
              size="small"
              className={isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>

            <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
            </div>

            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="outline"
              size="small"
              className={isDarkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : ''}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}

        {/* Load More Button (Alternative to pagination) */}
        {!loading && !searchQuery && hasMore && posts.length > 0 && (
          <div className="text-center mb-8">
            <Button
              onClick={handleLoadMore}
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
          </p>
        </div>
      </div>
    </div>
  );
};

// Post Card Component
const PostCard = ({ post, isDarkMode }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      setLoadingUser(true);
      try {
        const userData = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
        if (userData.ok) {
          const userInfo = await userData.json();
          setUser(userInfo);
        }
      } catch (err) {
        console.error('Error loading user:', err);
      } finally {
        setLoadingUser(false);
      }
    };

    loadUser();
  }, [post.userId]);

  return (
    <Card className={`h-full flex flex-col ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'hover:shadow-lg'}`}>
      <div className="flex-1">
        <h3 className={`text-lg font-semibold mb-2 line-clamp-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {post.title}
        </h3>
        
        <p className={`text-sm mb-4 line-clamp-3 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {post.body}
        </p>

        {/* User Info */}
        <div className={`flex items-center space-x-2 mb-4 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {loadingUser ? (
            <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" />
          ) : user ? (
            <>
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {user.name.charAt(0)}
              </div>
              <span className="text-xs">{user.name}</span>
            </>
          ) : (
            <span className="text-xs">Unknown User</span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <span className={`text-xs ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Post #{post.id}
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

export default APIIntegration; 