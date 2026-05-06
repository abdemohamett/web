import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import './AdminProjects.css';

export default function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    category: '',
    name: '',
  });

  const fetchSkills = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setSkills(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
      setMessage('Error loading skills');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const handleAdd = () => {
    setEditingSkill(null);
    setFormData({
      category: '',
      name: '',
    });
    setShowModal(true);
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData(skill);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;

    try {
      const { error } = await supabase.from('skills').delete().eq('id', id);
      if (error) throw error;
      setMessage('Skill deleted successfully');
      fetchSkills();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting skill:', error);
      setMessage('Error deleting skill');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      if (editingSkill) {
        const { error } = await supabase
          .from('skills')
          .update(formData)
          .eq('id', editingSkill.id);
        if (error) throw error;
        setMessage('Skill updated successfully');
      } else {
        const { error } = await supabase.from('skills').insert(formData);
        if (error) throw error;
        setMessage('Skill created successfully');
      }
      setShowModal(false);
      fetchSkills();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving skill:', error);
      setMessage('Error saving skill');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-projects">
      <div className="page-header">
        <h1 className="h1 mb-4">Skills</h1>
        <button onClick={handleAdd} className="btn-primary">
          Add Skill
        </button>
      </div>

      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <div className="projects-list">
        {skills.map((skill) => (
          <div key={skill.id} className="project-card">
            <div className="project-info">
              <h3 className="h3">{skill.name}</h3>
              <p className="body-sm text-on-surface-variant">{skill.category}</p>
            </div>
            <div className="project-actions">
              <button onClick={() => handleEdit(skill)} className="btn-secondary small">
                Edit
              </button>
              <button onClick={() => handleDelete(skill.id)} className="btn-danger small">
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
              {editingSkill ? 'Edit Skill' : 'Add Skill'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-4">
                <label className="label-md block mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="form-input"
                  required
                >
                  <option value="">Select category</option>
                  <option value="Frontend Development">Frontend Development</option>
                  <option value="Design & UI/UX">Design & UI/UX</option>
                  <option value="Backend & Tools">Backend & Tools</option>
                </select>
              </div>
              <div className="form-group mb-4">
                <label className="label-md block mb-2">Skill Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingSkill ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
