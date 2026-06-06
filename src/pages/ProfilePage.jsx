import "../components/ProfilePage.css";

export default function ProfilePage() {
  const profile = {
    name: "Alex Morgan",
    username: "@alexcooks",
    email: "alex@example.com",
    location: "Seattle, WA",
    bio: "Home cook who loves quick weeknight meals and pantry-friendly recipes.",
    joined: "March 2025"
  };

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
      </section>
    </main>
  );
}