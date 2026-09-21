export default function Header() {
  return (
    <header className="site-header">
      <h1 className="logo">UMCine</h1>

      <nav className="header-nav">
        <a href="#">영화</a>
        <a href="#">검색</a>
        <a href="#">내 정보</a>
      </nav>

      <div className="header-actions">
        <button className="search-button">⌕</button>
        <button className="login-button">로그인</button>
      </div>
    </header>
  );
}