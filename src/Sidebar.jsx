const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar__logo">
        <img src="/img/logo.svg" alt="Spotify Logo" />
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar__menu">
        <div className="sidebar__menuItem">
          <img src="/img/home.svg" alt="Home" />
          <span>Home</span>
        </div>
        <div className="sidebar__menuItem">
          <img src="/img/search.svg" alt="Search" />
          <span>Search</span>
        </div>
        <div className="sidebar__menuItem">
          <img src="/img/library.svg" alt="Your Library" />
          <span>Your Library</span>
        </div>
      </nav>

      {/* Playlists Section */}
      <div className="sidebar__playlists">
        <div className="sidebar__menuItem">
          <img src="/img/create.svg" alt="Create Playlist" />
          <span>Create Playlist</span>
        </div>
        <div className="sidebar__menuItem">
          <img src="/img/liked.svg" alt="Liked Songs" />
          <span>Liked Songs</span>
        </div>
      </div>

      {/* Playlist List */}
      <div className="sidebar__playlistList">
        <span>My Playlist #1</span>
        <span>My Playlist #2</span>
        <span>My Playlist #3</span>
        {/* Add more playlist items as needed */}
      </div>
    </div>
  );
};

export default Sidebar;
