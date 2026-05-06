import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import ImageUpload from '../components/ImageUpload';
import './AdminSettings.css';

const GENERAL_FIELDS = [
  { key: 'site_name', label: 'Site Name', type: 'text' },
  { key: 'site_year', label: 'Site Year', type: 'text' },
  { key: 'availability_status', label: 'Availability Status', type: 'text' },
  { key: 'nav_brand_name', label: 'Brand Name', type: 'text' },
  { key: 'nav_button_text', label: 'Nav Button Text', type: 'text' },
];

const HOME_FIELDS = [
  { key: 'home_hero_title', label: 'Hero Title', type: 'textarea' },
  { key: 'home_hero_subtitle', label: 'Hero Subtitle', type: 'textarea' },
  { key: 'home_profile_image', label: 'Profile Image', type: 'image' },
  { key: 'home_about_title', label: 'About Title', type: 'text' },
  { key: 'home_about_paragraph1', label: 'About Paragraph 1', type: 'textarea' },
  { key: 'home_about_paragraph2', label: 'About Paragraph 2', type: 'textarea' },
  { key: 'home_years_experience', label: 'Years Experience', type: 'text' },
  { key: 'home_projects_completed', label: 'Projects Completed', type: 'text' },
  { key: 'home_client_satisfaction', label: 'Client Satisfaction', type: 'text' },
  { key: 'home_services_title', label: 'Services Title', type: 'text' },
  { key: 'home_services_subtitle', label: 'Services Subtitle', type: 'textarea' },
  { key: 'home_cta_title', label: 'CTA Title', type: 'text' },
  { key: 'home_cta_subtitle', label: 'CTA Subtitle', type: 'textarea' },
  { key: 'home_cta_button_text', label: 'CTA Button Text', type: 'text' },
  { key: 'home_cta_secondary_button_text', label: 'CTA Secondary Button', type: 'text' },
];

const ABOUT_FIELDS = [
  { key: 'about_hero_badge', label: 'Hero Badge', type: 'text' },
  { key: 'about_hero_title', label: 'Hero Title', type: 'textarea' },
  { key: 'about_hero_subtitle', label: 'Hero Subtitle', type: 'textarea' },
  { key: 'about_portrait_image', label: 'Portrait Image', type: 'image' },
  { key: 'about_story_title', label: 'Story Title', type: 'text' },
  { key: 'about_story_paragraph1', label: 'Story Paragraph 1', type: 'textarea' },
  { key: 'about_story_paragraph2', label: 'Story Paragraph 2', type: 'textarea' },
  { key: 'about_story_paragraph3', label: 'Story Paragraph 3', type: 'textarea' },
  { key: 'about_principles_title', label: 'Principles Title', type: 'text' },
  { key: 'about_principles_subtitle', label: 'Principles Subtitle', type: 'textarea' },
  { key: 'about_timeline_title', label: 'Timeline Title', type: 'text' },
  { key: 'about_cta_title', label: 'CTA Title', type: 'text' },
  { key: 'about_cta_button_primary', label: 'CTA Primary Button', type: 'text' },
  { key: 'about_cta_button_secondary', label: 'CTA Secondary Button', type: 'text' },
];

const CONTACT_FIELDS = [
  { key: 'contact_availability', label: 'Availability Text', type: 'text' },
  { key: 'contact_hero_title', label: 'Hero Title', type: 'text' },
  { key: 'contact_hero_subtitle', label: 'Hero Subtitle', type: 'textarea' },
  { key: 'contact_email', label: 'Email Address', type: 'text' },
  { key: 'contact_location', label: 'Location', type: 'text' },
  { key: 'contact_whatsapp_title', label: 'WhatsApp Title', type: 'text' },
  { key: 'contact_whatsapp_subtitle', label: 'WhatsApp Subtitle', type: 'textarea' },
  { key: 'contact_whatsapp_url', label: 'WhatsApp URL', type: 'text' },
  { key: 'contact_response_time', label: 'Response Time', type: 'text' },
];

const SECTIONS = [
  { id: 'general', title: 'General', icon: 'settings', fields: GENERAL_FIELDS },
  { id: 'home', title: 'Home Page', icon: 'home', fields: HOME_FIELDS },
  { id: 'about', title: 'About Page', icon: 'person', fields: ABOUT_FIELDS },
  { id: 'contact', title: 'Contact Page', icon: 'mail', fields: CONTACT_FIELDS },
  { id: 'account', title: 'Account', icon: 'account_circle', fields: [] },
];

export default function AdminSettings() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('general');

  // Account state
  const [accountData, setAccountData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [updatingAccount, setUpdatingAccount] = useState(false);

  const fetchSettings = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');

      if (error) throw error;

      const settingsMap = {};
      data.forEach(setting => {
        settingsMap[setting.key] = setting.value;
      });
      setSettings(settingsMap);
    } catch (error) {
      console.error('Error fetching settings:', error);
      setMessage('Error loading settings');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleAccountChange = (field, value) => {
    setAccountData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdatePassword = async () => {
    if (!accountData.newPassword || !accountData.confirmPassword) {
      setMessage('Please fill in all password fields');
      return;
    }
    if (accountData.newPassword !== accountData.confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }
    if (accountData.newPassword.length < 6) {
      setMessage('Password must be at least 6 characters');
      return;
    }
    if (accountData.newPassword === accountData.currentPassword) {
      setMessage('New password must be different from current password');
      return;
    }

    setUpdatingAccount(true);
    setMessage('');

    try {
      const { error } = await supabase.auth.updateUser({ password: accountData.newPassword });
      if (error) throw error;
      setMessage('✓ Password updated successfully! You can now log in with your new password.');
      setAccountData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      console.error('Error updating password:', error);
      setMessage('Error: ' + error.message);
    } finally {
      setUpdatingAccount(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const updates = Object.entries(settings).map(([key, value]) =>
        supabase
          .from('site_settings')
          .update({ value })
          .eq('key', key)
      );

      await Promise.all(updates);
      setMessage('Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  const renderField = (field) => {
    const value = settings[field.key] || '';

    if (field.type === 'image') {
      return (
        <ImageUpload
          value={value}
          onChange={(url) => handleChange(field.key, url)}
          label={field.label}
        />
      );
    }

    if (field.type === 'textarea') {
      return (
        <textarea
          value={value}
          onChange={(e) => handleChange(field.key, e.target.value)}
          className="setting-input"
          rows={3}
          placeholder={`Enter ${field.label.toLowerCase()}`}
        />
      );
    }

    return (
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(field.key, e.target.value)}
        className="setting-input"
        placeholder={`Enter ${field.label.toLowerCase()}`}
      />
    );
  };

  if (loading) return <div className="loading">Loading...</div>;

  const renderAccountPanel = () => (
    <div className="settings-form">
      {/* Password Section */}
      <div className="setting-field">
        <label className="field-label">Change Password</label>
        <input
          type="password"
          value={accountData.newPassword}
          onChange={(e) => handleAccountChange('newPassword', e.target.value)}
          className="setting-input"
          placeholder="Enter new password"
        />
        <input
          type="password"
          value={accountData.confirmPassword}
          onChange={(e) => handleAccountChange('confirmPassword', e.target.value)}
          className="setting-input"
          placeholder="Confirm new password"
        />
        <p className="field-hint">Password must be at least 6 characters</p>
        <button
          onClick={handleUpdatePassword}
          disabled={updatingAccount || !accountData.newPassword || !accountData.confirmPassword}
          className="btn-secondary account-btn"
        >
          {updatingAccount ? 'Updating...' : 'Update Password'}
        </button>
      </div>
    </div>
  );

  const currentSection = SECTIONS.find(s => s.id === activeTab);

  return (
    <div className="admin-settings">
      <div className="settings-header">
        <div>
          <h1 className="h1">Site Settings</h1>
          <p className="text-secondary">Manage your website content and images</p>
        </div>
        <button onClick={handleSave} className="btn-primary save-btn" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <div className="settings-tabs">
        {SECTIONS.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveTab(section.id)}
            className={`tab-btn ${activeTab === section.id ? 'active' : ''}`}
          >
            <span className="material-symbols-outlined">{section.icon}</span>
            {section.title}
          </button>
        ))}
      </div>

      <div className="settings-panel">
        <h2 className="panel-title">{currentSection?.title}</h2>
        {activeTab === 'account' ? (
          renderAccountPanel()
        ) : (
          <div className="settings-form">
            {currentSection?.fields.map(field => (
              <div key={field.key} className="setting-field">
                <label className="field-label">{field.label}</label>
                {renderField(field)}
              </div>
            ))}
          </div>
        )}
      </div>

      {activeTab !== 'account' && (
        <div className="mobile-save">
          <button onClick={handleSave} className="btn-primary w-full" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      )}
    </div>
  );
}

