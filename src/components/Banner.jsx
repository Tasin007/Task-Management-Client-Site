const Banner = () => {
    return (
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/2dxKfLr/Banner.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-40"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-white">Welcome to Schedule</h1>
            <p className="mb-5 text-white">
              Manage your tasks efficiently with Schedule. Organize, track, and complete your work seamlessly. Experience a smarter way to stay on top of your schedule.
            </p>
            <button className="btn btn-primary">Let’s Explore</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Banner;
  