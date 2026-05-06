import { useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import './ImageUpload.css';

export default function ImageUpload({ value, onChange, label = 'Image' }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || '');
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);

    try {
      // Create preview
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `portfolio/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      onChange(publicUrl);
      setPreview(publicUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
      setPreview(value || '');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    onChange('');
    setPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="image-upload">
      <label className="label-md block mb-2">{label}</label>
      
      {preview ? (
        <div className="image-preview-container">
          <img src={preview} alt="Preview" className="image-preview" />
          <div className="image-actions">
            <button
              type="button"
              onClick={triggerFileInput}
              className="btn-secondary small"
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Change'}
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="btn-danger small"
              disabled={uploading}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={triggerFileInput}
          className="image-upload-placeholder"
          role="button"
          tabIndex={0}
        >
          <span className="material-symbols-outlined">add_photo_alternate</span>
          <span className="placeholder-text">
            {uploading ? 'Uploading...' : 'Click to upload image'}
          </span>
          <span className="placeholder-hint">PNG, JPG up to 5MB</span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden-input"
        disabled={uploading}
      />
    </div>
  );
}

export function ImageUploadSimple({ value, onChange, label = 'Image' }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `portfolio/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      onChange(publicUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="image-upload-simple">
      <label className="label-md block mb-2">{label}</label>
      <div className="image-upload-row">
        {value && (
          <img src={value} alt="Current" className="image-thumbnail" />
        )}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="btn-secondary"
          disabled={uploading}
        >
          <span className="material-symbols-outlined">
            {uploading ? 'hourglass_empty' : 'upload'}
          </span>
          {uploading ? 'Uploading...' : value ? 'Change Image' : 'Upload Image'}
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden-input"
        disabled={uploading}
      />
    </div>
  );
}
