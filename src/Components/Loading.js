import "./Loading.css";

export default function Loading({ message = "Loading...", fullScreen = false }) {
    return (
        <div className={fullScreen ? "loading-container full-screen" : "loading-container"}>
            <div className="spinner"></div>
            <p className="loading-message">{message}</p>
        </div>
    );
}
