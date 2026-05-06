import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import './AdminProjects.css';

export default function AdminPrinciples() {
  const [principles, setPrinciples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPrinciple, setEditingPrinciple] = useState(null);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    icon: '',
    description: '',
  });

  const fetchPrinciples = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('principles')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setPrinciples(data);
    } catch (error) {
      console.error('Error fetching principles:', error);
      setMessage('Error loading principles');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrinciples();
  }, [fetchPrinciples]);

  const handleAdd = () => {
    setEditingPrinciple(null);
    setFormData({
      title: '',
      icon: '',
      description: '',
    });
    setShowModal(true);
  };

  const handleEdit = (principle) => {
    setEditingPrinciple(principle);
    setFormData(principle);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this principle?')) return;

    try {
      const { error } = await supabase.from('principles').delete().eq('id', id);
      if (error) throw error;
      setMessage('Principle deleted successfully');
      fetchPrinciples();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting principle:', error);
      setMessage('Error deleting principle');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      if (editingPrinciple) {
        const { error } = await supabase
          .from('principles')
          .update(formData)
          .eq('id', editingPrinciple.id);
        if (error) throw error;
        setMessage('Principle updated successfully');
      } else {
        const { error } = await supabase.from('principles').insert(formData);
        if (error) throw error;
        setMessage('Principle created successfully');
      }
      setShowModal(false);
      fetchPrinciples();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving principle:', error);
      setMessage('Error saving principle');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-projects">
      <div className="page-header">
        <h1 className="h1 mb-4">Principles</h1>
        <button onClick={handleAdd} className="btn-primary">
          Add Principle
        </button>
      </div>

      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <div className="projects-list">
        {principles.map((principle) => (
          <div key={principle.id} className="project-card">
            <div className="project-preview">
              <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>
                {principle.icon}
              </span>
            </div>
            <div className="project-info">
              <h3 className="h3">{principle.title}</h3>
              <p className="body-md mt-2">{principle.description}</p>
            </div>
            <div className="project-actions">
              <button onClick={() => handleEdit(principle)} className="btn-secondary small">
                Edit
              </button>
              <button onClick={() => handleDelete(principle.id)} className="btn-danger small">
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
              {editingPrinciple ? 'Edit Principle' : 'Add Principle'}
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
              <div className="form-group mb-4">
                <label className="label-md block mb-2">Icon (Material Symbol Name)</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="form-input"
                  placeholder="e.g., groups, strategy, school"
                  required
                />
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
                  {editingPrinciple ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
