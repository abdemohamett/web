import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import './AdminProjects.css';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    icon: '',
    description: '',
  });

  const fetchServices = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
      setMessage('Error loading services');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleAdd = () => {
    setEditingService(null);
    setFormData({
      title: '',
      icon: '',
      description: '',
    });
    setShowModal(true);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData(service);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;

    try {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
      setMessage('Service deleted successfully');
      fetchServices();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting service:', error);
      setMessage('Error deleting service');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      if (editingService) {
        const { error } = await supabase
          .from('services')
          .update(formData)
          .eq('id', editingService.id);
        if (error) throw error;
        setMessage('Service updated successfully');
      } else {
        const { error } = await supabase.from('services').insert(formData);
        if (error) throw error;
        setMessage('Service created successfully');
      }
      setShowModal(false);
      fetchServices();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving service:', error);
      setMessage('Error saving service');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-projects">
      <div className="page-header">
        <h1 className="h1 mb-4">Services</h1>
        <button onClick={handleAdd} className="btn-primary">
          Add Service
        </button>
      </div>

      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <div className="projects-list">
        {services.map((service) => (
          <div key={service.id} className="project-card">
            <div className="project-preview">
              <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>
                {service.icon}
              </span>
            </div>
            <div className="project-info">
              <h3 className="h3">{service.title}</h3>
              <p className="body-md mt-2">{service.description}</p>
            </div>
            <div className="project-actions">
              <button onClick={() => handleEdit(service)} className="btn-secondary small">
                Edit
              </button>
              <button onClick={() => handleDelete(service.id)} className="btn-danger small">
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
              {editingService ? 'Edit Service' : 'Add Service'}
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
                  placeholder="e.g., brush, psychology, campaign"
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
                  {editingService ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
