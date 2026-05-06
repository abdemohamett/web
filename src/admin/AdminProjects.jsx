import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { ImageUploadSimple } from '../components/ImageUpload';
import './AdminProjects.css';

export default function AdminProjects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    subcategory: '',
    description: '',
    image: '',
    size: 'normal',
  });

  const fetchProjects = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setMessage('Error loading projects');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleAdd = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      category: '',
      subcategory: '',
      description: '',
      image: '',
      size: 'normal',
    });
    setShowModal(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData(project);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      setMessage('Project deleted successfully');
      fetchProjects();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting project:', error);
      setMessage('Error deleting project');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Check if user is logged in
    if (!user) {
      setMessage('Error: You must be logged in to save changes');
      return;
    }

    console.log('Saving project, user:', user.email);
    console.log('Form data:', formData);

    try {
      if (editingProject) {
        console.log('Updating project ID:', editingProject.id);
        const { data, error } = await supabase
          .from('projects')
          .update(formData)
          .eq('id', editingProject.id)
          .select();
        if (error) {
          console.error('Supabase update error:', error);
          throw error;
        }
        console.log('Update response:', data);
        setMessage('Project updated successfully');
      } else {
        console.log('Inserting new project');
        const { data, error } = await supabase
          .from('projects')
          .insert(formData)
          .select();
        if (error) {
          console.error('Supabase insert error:', error);
          throw error;
        }
        console.log('Insert response:', data);
        setMessage('Project created successfully');
      }
      setShowModal(false);
      fetchProjects();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving project:', error);
      setMessage('Error: ' + (error.message || 'Unknown error'));
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-projects">
      {/* Debug Info */}
      {!user && (
        <div className="message error mb-4">
          <strong>Not logged in!</strong> Please log in to make changes.
        </div>
      )}
      {user && (
        <div className="message success mb-4" style={{ fontSize: '0.8rem' }}>
          Logged in as: {user.email}
        </div>
      )}

      <div className="page-header">
        <h1 className="h1 mb-4">Projects</h1>
        <button onClick={handleAdd} className="btn-primary" disabled={!user}>
          Add Project
        </button>
      </div>

      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <div className="projects-list">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-preview">
              {project.image && <img src={project.image} alt={project.title} />}
            </div>
            <div className="project-info">
              <h3 className="h3">{project.title}</h3>
              <p className="body-sm text-on-surface-variant">
                {project.category} {project.subcategory && `• ${project.subcategory}`}
              </p>
              <p className="body-md mt-2">{project.description}</p>
            </div>
            <div className="project-actions">
              <button onClick={() => handleEdit(project)} className="btn-secondary small">
                Edit
              </button>
              <button onClick={() => handleDelete(project.id)} className="btn-danger small">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="h2 mb-6">
              {editingProject ? 'Edit Project' : 'Add Project'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-4">
                <label className="label-md block mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-row mb-4">
                <div className="form-group flex-1">
                  <label className="label-md block mb-2">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group flex-1">
                  <label className="label-md block mb-2">Subcategory</label>
                  <input
                    type="text"
                    value={formData.subcategory}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>
              <div className="form-group mb-4">
                <label className="label-md block mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="form-input"
                  rows={4}
                  required
                />
              </div>
              <div className="form-group mb-4">
                <ImageUploadSimple
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  label="Project Image"
                />
              </div>
              <div className="form-group mb-4">
                <label className="label-md block mb-2">Size</label>
                <select
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  className="form-input"
                >
                  <option value="normal">Normal</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingProject ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
