import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import './AdminProjects.css';

export default function AdminSocial() {
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    platform: '',
    url: '',
    display_name: '',
  });

  const fetchSocialLinks = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setSocialLinks(data);
    } catch (error) {
      console.error('Error fetching social links:', error);
      setMessage('Error loading social links');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSocialLinks();
  }, [fetchSocialLinks]);

  const handleAdd = () => {
    setEditingLink(null);
    setFormData({
      platform: '',
      url: '',
      display_name: '',
    });
    setShowModal(true);
  };

  const handleEdit = (link) => {
    setEditingLink(link);
    setFormData(link);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this social link?')) return;

    try {
      const { error } = await supabase.from('social_links').delete().eq('id', id);
      if (error) throw error;
      setMessage('Social link deleted successfully');
      fetchSocialLinks();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting social link:', error);
      setMessage('Error deleting social link');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      if (editingLink) {
        const { error } = await supabase
          .from('social_links')
          .update(formData)
          .eq('id', editingLink.id);
        if (error) throw error;
        setMessage('Social link updated successfully');
      } else {
        const { error } = await supabase.from('social_links').insert(formData);
        if (error) throw error;
        setMessage('Social link created successfully');
      }
      setShowModal(false);
      fetchSocialLinks();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving social link:', error);
      setMessage('Error saving social link');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-projects">
      <div className="page-header">
        <h1 className="h1 mb-4">Social Links</h1>
        <button onClick={handleAdd} className="btn-primary">
          Add Social Link
        </button>
      </div>

      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <div className="projects-list">
        {socialLinks.map((link) => (
          <div key={link.id} className="project-card">
            <div className="project-info">
              <h3 className="h3">{link.display_name || link.platform}</h3>
              <p className="body-sm text-on-surface-variant">{link.platform}</p>
              <p className="body-md mt-2">{link.url}</p>
              {!link.is_visible && (
                <span className="tag-outline label-md mt-2" style={{ color: '#991b1b', borderColor: '#fecaca' }}>
                  Hidden
                </span>
              )}
            </div>
            <div className="project-actions">
              <button onClick={() => handleEdit(link)} className="btn-secondary small">
                Edit
              </button>
              <button onClick={() => handleDelete(link.id)} className="btn-danger small">
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
              {editingLink ? 'Edit Social Link' : 'Add Social Link'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-4">
                <label className="label-md block mb-2">Platform</label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  className="form-input"
                  required
                >
                  <option value="">Select platform</option>
                  <option value="twitter">Twitter</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="github">GitHub</option>
                  <option value="dribbble">Dribbble</option>
                  <option value="instagram">Instagram</option>
                  <option value="youtube">YouTube</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group mb-4">
                <label className="label-md block mb-2">URL</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label className="label-md block mb-2">Display Name</label>
                <input
                  type="text"
                  value={formData.display_name}
                  onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                  className="form-input"
                  placeholder="Leave empty to use platform name"
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingLink ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
