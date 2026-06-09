import { useState } from "react";
import "../components/ProfilePage.css";

export default function ProfilePage() {
  const defaultProfile = {
    name: "Alex Morgan",
    username: "@alexcooks",
    email: "alex@example.com",
    location: "Seattle, WA",
    bio: "Home cook who loves quick weeknight meals and pantry-friendly recipes.",
    joined: "March 2025"
  };

  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("pantryProfile");

    if (!savedProfile) {
      return defaultProfile;
    }

    try {
      return JSON.parse(savedProfile);
    } catch {
      return defaultProfile;
    }
  });
  const [formData, setFormData] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleEditStart() {
    setFormData(profile);
    setIsEditing(true);
  }

  function handleCancel() {
    setFormData(profile);
    setIsEditing(false);
  }

  function handleSave(event) {
    event.preventDefault();
    setProfile(formData);
    localStorage.setItem("pantryProfile", JSON.stringify(formData));
    setIsEditing(false);
  }

  return (
    <main className="profile-page">
      <section className="profile-card" aria-label="User profile">
        <div className="profile-header">
          <div className="profile-avatar" aria-hidden="true">
            {profile.name
              .split(" ")
              .map((part) => part[0])
              .join("")}
          </div>
          <div className="profile-identity">
            <h1 className="profile-name">{profile.name}</h1>
            <p className="profile-username">{profile.username}</p>
          </div>
        </div>

        {isEditing ? (
          <form className="profile-form" onSubmit={handleSave}>
            <label className="profile-input-group" htmlFor="name">
              Name
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label className="profile-input-group" htmlFor="username">
              Username
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </label>

            <label className="profile-input-group" htmlFor="email">
              Email
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label className="profile-input-group" htmlFor="location">
              Location
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
              />
            </label>

            <label className="profile-input-group" htmlFor="bio">
              Bio
              <textarea
                id="bio"
                name="bio"
                rows="4"
                value={formData.bio}
                onChange={handleChange}
              />
            </label>

            <div className="profile-actions">
              <button type="submit" className="profile-btn profile-btn-primary">
                Save Profile
              </button>
              <button
                type="button"
                className="profile-btn profile-btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <p className="profile-bio">{profile.bio}</p>

            <dl className="profile-details">
              <div className="profile-detail-row">
                <dt>Email</dt>
                <dd>{profile.email}</dd>
              </div>
              <div className="profile-detail-row">
                <dt>Location</dt>
                <dd>{profile.location}</dd>
              </div>
              <div className="profile-detail-row">
                <dt>Member Since</dt>
                <dd>{profile.joined}</dd>
              </div>
            </dl>

            <div className="profile-actions">
              <button
                type="button"
                className="profile-btn profile-btn-primary"
                onClick={handleEditStart}
              >
                Edit Profile
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}