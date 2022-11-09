import "./Display.css";

function Display({ value }) {
    return <input className="display" value={value} readOnly />;
}

export default Display;
