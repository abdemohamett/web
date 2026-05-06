import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import './AdminProjects.css';

export default function AdminExperiences() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    date_range: '',
    description: '',
  });

  const fetchExperiences = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setExperiences(data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      setMessage('Error loading experiences');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  const handleAdd = () => {
    setEditingExperience(null);
    setFormData({
      title: '',
      company: '',
      date_range: '',
      description: '',
    });
    setShowModal(true);
  };

  const handleEdit = (experience) => {
    setEditingExperience(experience);
    setFormData(experience);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this experience?')) return;

    try {
      const { error } = await supabase.from('experiences').delete().eq('id', id);
      if (error) throw error;
      setMessage('Experience deleted successfully');
      fetchExperiences();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting experience:', error);
      setMessage('Error deleting experience');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      if (editingExperience) {
        const { error } = await supabase
          .from('experiences')
          .update(formData)
          .eq('id', editingExperience.id);
        if (error) throw error;
        setMessage('Experience updated successfully');
      } else {
        const { error } = await supabase.from('experiences').insert(formData);
        if (error) throw error;
        setMessage('Experience created successfully');
      }
      setShowModal(false);
      fetchExperiences();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving experience:', error);
      setMessage('Error saving experience');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-projects">
      <div className="page-header">
        <h1 className="h1 mb-4">Experiences</h1>
        <button onClick={handleAdd} className="btn-primary">
          Add Experience
        </button>
      </div>

      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <div className="projects-list">
        {experiences.map((experience) => (
          <div key={experience.id} className="project-card">
            <div className="project-info">
              <h3 className="h3">{experience.title}</h3>
              <p className="body-sm text-on-surface-variant">
                {experience.company && `${experience.company} • `}{experience.date_range}
              </p>
              <p className="body-md mt-2">{experience.description}</p>
            </div>
            <div className="project-actions">
              <button onClick={() => handleEdit(experience)} className="btn-secondary small">
                Edit
              </button>
              <button onClick={() => handleDelete(experience.id)} className="btn-danger small">
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
              {editingExperience ? 'Edit Experience' : 'Add Experience'}
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
                  <label className="label-md block mb-2">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group flex-1">
                  <label className="label-md block mb-2">Date Range</label>
                  <input
                    type="text"
                    value={formData.date_range}
                    onChange={(e) => setFormData({ ...formData, date_range: e.target.value })}
                    className="form-input"
                    placeholder="2021 — PRESENT"
                    required
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
              <div className="form-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingExperience ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
