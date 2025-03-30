import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Avatar,
  Grid,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Badge,
  Paper,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Search,
  FilterList,
  Star,
  People,
  Schedule,
  PlayCircle,
  Description,
  Bookmark,
  Share,
  MoreVert,
  Dashboard,
  School,
  Assessment,
  Settings,
  Notifications,
  Person,
  Add,
  Edit,
  Delete,
  ArrowBack
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f7fa',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

const DashboardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const SearchBar = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  backgroundColor: 'white',
  borderRadius: theme.shape.borderRadius,
}));

const ManageCourse = () => {
  // State for courses
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  
  // Modal states
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // Form state
  const [courseForm, setCourseForm] = useState({
    title: '',
    category: '',
    description: '',
    tags: [],
    level: 'Beginner',
    duration: '',
    thumbnail: ''
  });

  // Sample categories - replace with your actual categories
  const categories = ['Mathematics', 'Science', 'History', 'Literature', 'Business', 'Computer Science'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const allTags = ['fundamentals', 'advanced', 'lab', 'theory', 'practical'];

  // Load courses - replace with your API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // For now using empty array - replace with your data
      setCourses([]);
      setFilteredCourses([]);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter courses
  useEffect(() => {
    let result = courses;
    
    if (searchTerm) {
      result = result.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (categoryFilter !== 'All') {
      result = result.filter(course => course.category === categoryFilter);
    }
    
    if (levelFilter !== 'All') {
      result = result.filter(course => course.level === levelFilter);
    }
    
    setFilteredCourses(result);
  }, [searchTerm, categoryFilter, levelFilter, courses]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle tag selection
  const handleTagChange = (tag) => {
    setCourseForm(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  // Open dialog for new course
  const handleNewCourse = () => {
    setCourseForm({
      title: '',
      category: '',
      description: '',
      tags: [],
      level: 'Beginner',
      duration: '',
      thumbnail: ''
    });
    setEditMode(false);
    setOpenDialog(true);
  };

  // Open dialog for editing course
  const handleEditCourse = (course) => {
    setCourseForm({
      title: course.title,
      category: course.category,
      description: course.description,
      tags: course.tags,
      level: course.level,
      duration: course.duration,
      thumbnail: course.thumbnail
    });
    setEditMode(true);
    setOpenDialog(true);
  };

  // Submit form
  const handleSubmit = () => {
    // Here you would call your API
    // For now just simulating success
    
    if (editMode) {
      // Update existing course
      setSnackbar({
        open: true,
        message: 'Course updated successfully!',
        severity: 'success'
      });
    } else {
      // Add new course
      setSnackbar({
        open: true,
        message: 'Course created successfully!',
        severity: 'success'
      });
    }
    
    setOpenDialog(false);
  };

  // Delete course
  const handleDeleteCourse = (id) => {
    // Here you would call your API
    // For now just simulating success
    setSnackbar({
      open: true,
      message: 'Course deleted successfully!',
      severity: 'success'
    });
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <ThemeProvider theme={theme}>
      <DashboardContainer className='pt-20'>
        <MainContent>
          {/* App Bar */}
          <AppBar position="static" color="inherit" elevation={0} sx={{ mb: 3 }}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Manage Courses
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<Add />}
                onClick={handleNewCourse}
              >
                New Course
              </Button>
            </Toolbar>
          </AppBar>

          {/* Filters */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <SearchBar
                  fullWidth
                  placeholder="Search courses..."
                  variant="outlined"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <Select
                  fullWidth
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="All">All Categories</MenuItem>
                  {categories.map(category => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={6} md={4}>
                <Select
                  fullWidth
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="All">All Levels</MenuItem>
                  {levels.map(level => (
                    <MenuItem key={level} value={level}>{level}</MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </Paper>

          {/* Courses List */}
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="300px">
              <CircularProgress />
            </Box>
          ) : filteredCourses.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6">No courses found</Typography>
              <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
                {courses.length === 0 ? 'You have not created any courses yet.' : 'Try adjusting your search or filters'}
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<Add />}
                onClick={handleNewCourse}
                sx={{ mt: 3 }}
              >
                Create Your First Course
              </Button>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {filteredCourses.map(course => (
                <Grid item xs={12} sm={6} md={4} key={course.id}>
                  <StyledCard>
                    <CardMedia
                      component="img"
                      height="140"
                      image={course.thumbnail || 'https://via.placeholder.com/300x200'}
                      alt={course.title}
                    />
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" mb={1}>
                        <Chip
                          label={course.category}
                          size="small"
                          color="primary"
                        />
                        <Box display="flex" alignItems="center">
                          <Star color="warning" fontSize="small" />
                          <Typography variant="body2" sx={{ ml: 0.5 }}>
                            {course.rating || 'New'}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Typography gutterBottom variant="h6" component="div">
                        {course.title}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 1 }}>
                        {course.description.substring(0, 100)}...
                      </Typography>
                      
                      <Box mb={1}>
                        {course.tags?.slice(0, 3).map(tag => (
                          <Chip 
                            key={tag} 
                            label={tag} 
                            size="small" 
                            sx={{ mr: 0.5, mb: 0.5 }} 
                          />
                        ))}
                      </Box>
                      
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Chip 
                          label={course.level} 
                          size="small" 
                          color={course.level === 'Beginner' ? 'success' : 'secondary'}
                        />
                        <Box>
                          <IconButton onClick={() => handleEditCourse(course)}>
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteCourse(course.id)}>
                            <Delete fontSize="small" color="error" />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          )}
        </MainContent>
      </DashboardContainer>

      {/* Course Form Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editMode ? 'Edit Course' : 'Create New Course'}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Course Title"
                name="title"
                value={courseForm.title}
                onChange={handleInputChange}
                margin="normal"
                required
              />
              
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={courseForm.description}
                onChange={handleInputChange}
                margin="normal"
                multiline
                rows={4}
                required
              />
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Select
                    fullWidth
                    label="Category"
                    name="category"
                    value={courseForm.category}
                    onChange={handleInputChange}
                    margin="dense"
                    required
                    displayEmpty
                    sx={{ mt: 2 }}
                  >
                    <MenuItem value="" disabled>Select Category</MenuItem>
                    {categories.map(category => (
                      <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <Select
                    fullWidth
                    label="Level"
                    name="level"
                    value={courseForm.level}
                    onChange={handleInputChange}
                    margin="dense"
                    required
                    sx={{ mt: 2 }}
                  >
                    {levels.map(level => (
                      <MenuItem key={level} value={level}>{level}</MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
              
              <TextField
                fullWidth
                label="Duration (e.g., 6 weeks)"
                name="duration"
                value={courseForm.duration}
                onChange={handleInputChange}
                margin="normal"
                required
              />
              
              <TextField
                fullWidth
                label="Thumbnail URL"
                name="thumbnail"
                value={courseForm.thumbnail}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <FormControl component="fieldset" sx={{ mt: 2 }}>
                <FormLabel component="legend">Tags</FormLabel>
                <FormGroup>
                  {allTags.map(tag => (
                    <FormControlLabel
                      key={tag}
                      control={
                        <Checkbox 
                          checked={courseForm.tags.includes(tag)}
                          onChange={() => handleTagChange(tag)}
                        />
                      }
                      label={tag}
                    />
                  ))}
                </FormGroup>
              </FormControl>
              
              {courseForm.thumbnail && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2">Thumbnail Preview</Typography>
                  <CardMedia
                    component="img"
                    height="140"
                    image={courseForm.thumbnail}
                    alt="Course thumbnail preview"
                    sx={{ mt: 1, borderRadius: 1 }}
                  />
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editMode ? 'Update Course' : 'Create Course'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default ManageCourse;