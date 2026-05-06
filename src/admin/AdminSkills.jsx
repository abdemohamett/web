import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import './AdminProjects.css';
import './AdminSkills.css';

export default function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [activeTab, setActiveTab] = useState('skills');
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    category: '',
    name: '',
  });

  const [categoryFormData, setCategoryFormData] = useState({
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
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      // Get unique categories from skills
      const { data: skillsData } = await supabase
        .from('skills')
        .select('category')
        .not('category', 'is', null);
      
      const uniqueCategories = [...new Set(skillsData?.map(s => s.category) || [])];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchSkills(), fetchCategories()]);
      setLoading(false);
    };
    fetchData();
  }, [fetchSkills, fetchCategories]);


  const handleAdd = () => {
    setEditingSkill(null);
    setFormData({
      category: '',
      name: '',
    });
    setShowModal(true);
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setCategoryFormData({
      name: '',
    });
    setShowCategoryModal(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryFormData({
      name: category,
    });
    setShowCategoryModal(true);
  };

  const handleDeleteCategory = async (category) => {
    if (!window.confirm(`Are you sure you want to delete category "${category}"? This will also delete all skills in this category.`)) return;
    setMessage('');

    try {
      // Delete all skills in this category
      const { error: deleteSkillsError } = await supabase
        .from('skills')
        .delete()
        .eq('category', category);
      
      if (deleteSkillsError) throw deleteSkillsError;
      
      setMessage(`Category "${category}" and all its skills deleted successfully`);
      await fetchSkills();
      await fetchCategories();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting category:', error);
      setMessage('Error deleting category');
    }
  };

  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!categoryFormData.name.trim()) {
      setMessage('Please enter a category name');
      return;
    }

    try {
      if (editingCategory) {
        // Update all skills with the old category name to the new one
        const { error } = await supabase
          .from('skills')
          .update({ category: categoryFormData.name })
          .eq('category', editingCategory);
        
        if (error) throw error;
        setMessage('Category updated successfully');
      } else {
        // Create a placeholder skill to establish the new category
        const { error: createError } = await supabase
          .from('skills')
          .insert({
            category: categoryFormData.name,
            name: 'Sample Skill',
            display_order: 999
          });
        
        if (createError) throw createError;
        setMessage('Category created successfully');
      }
      
      setShowCategoryModal(false);
      await fetchSkills();
      await fetchCategories();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving category:', error);
      setMessage('Error: ' + error.message);
    }
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
      {/* Tabs */}
      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          Skills
        </button>
        <button 
          className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          Categories
        </button>
      </div>

      {/* Skills Tab */}
      {activeTab === 'skills' && (
        <>
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
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <p className="field-hint">Select an existing category or create a new one in the Categories tab</p>
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
        </>
      )}

      {/* Categories Tab */}
  {activeTab === 'categories' && (
    <section className="categories-section">
      <div className="page-header">
        <h1 className="h1 mb-4">Categories</h1>
        <button onClick={handleAddCategory} className="btn-primary">
          Add Category
        </button>
      </div>

      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <div className="categories-list">
        {categories.map((category) => (
          <div key={category} className="category-card">
            <div className="category-info">
              <h3 className="h3">{category}</h3>
              <p className="body-sm text-on-surface-variant">
                {skills.filter(s => s.category === category).length} skill(s)
              </p>
            </div>
            <div className="category-actions">
              <button onClick={() => handleEditCategory(category)} className="btn-icon">
                <span className="material-symbols-outlined">edit</span>
              </button>
              <button onClick={() => handleDeleteCategory(category)} className="btn-icon">
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        ))}
        {categories.length === 0 && (
          <div className="empty-state">
            <p>No categories found. Add your first category to get started.</p>
          </div>
        )}
      </div>
    </section>
  )}

  {/* Category Modal */}
  {showCategoryModal && (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="h2">{editingCategory ? 'Edit Category' : 'Add Category'}</h2>
          <button onClick={() => setShowCategoryModal(false)} className="btn-icon">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <form onSubmit={handleSubmitCategory} className="modal-form">
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              value={categoryFormData.name}
              onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
              className="form-input"
              placeholder="Enter category name (e.g., Frontend Development)"
              required
            />
            <p className="field-hint">This will be displayed as the category heading on the Skills page</p>
          </div>
          {editingCategory && (
            <div className="info-box">
              <span className="material-symbols-outlined">info</span>
              <p>Editing this category will update all {skills.filter(s => s.category === editingCategory).length} skills currently in "{editingCategory}"</p>
            </div>
          )}
          <div className="modal-actions">
            <button type="button" onClick={() => setShowCategoryModal(false)} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {editingCategory ? 'Update Category' : 'Add Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
</div>
  );
}
