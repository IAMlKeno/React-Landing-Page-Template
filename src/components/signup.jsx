export const Signup = (props) => {
  return (
    <div id="signup" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2><a data-toggle="collapse" href="#signup-form-container">Sign up now!</a></h2>
        </div>
        <div className="row collapse" id="signup-form-container">
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScSL1RY1ZYE-hnmYgq1igqZiAYv6Kgz8kJNlxPrUv5cX-rIjA/viewform?embedded=true" width="640" height="1503" title="Signup Form">
            Loading…
          </iframe>
        </div>
      </div>
    </div>
  );
};
