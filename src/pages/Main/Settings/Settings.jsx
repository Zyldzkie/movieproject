import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    language: 'en',
  });
  const navigate = useNavigate();

  useEffect(() => {
    // You can load user settings from localStorage or an API here
    const savedSettings = JSON.parse(localStorage.getItem('userSettings'));
    if (savedSettings) {
      setSettings(savedSettings);
    }
  }, []);

  const handleSave = () => {
    // Save settings to localStorage or backend
    localStorage.setItem('userSettings', JSON.stringify(settings));
    alert('Settings saved!');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className="settings-layout">
      <div className="settings-card">
        <h3>Settings</h3>
        <div className="settings-option">
          <label htmlFor="theme">Theme</label>
          <select
            name="theme"
            id="theme"
            value={settings.theme}
            onChange={handleChange}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="settings-option">
          <label htmlFor="notifications">Enable Notifications</label>
          <input
            type="checkbox"
            name="notifications"
            id="notifications"
            checked={settings.notifications}
            onChange={handleChange}
          />
        </div>

        <div className="settings-option">
          <label htmlFor="language">Language</label>
          <select
            name="language"
            id="language"
            value={settings.language}
            onChange={handleChange}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            {/* Add other languages as needed */}
          </select>
        </div>

        <div className="settings-action">
          <button onClick={handleSave}>Save Settings</button>
          <button onClick={() => navigate('/main')}>Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
