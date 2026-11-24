import React from "react";

const BlueChalkLoader = ({ inline = false, className = "" }) => {
  if (inline) {
    return (
      <div className={`inline-loader ${className}`}>
        <div className="bluechalk-bar" aria-label="Loading..."></div>
      </div>
    );
  }

  return (
    <div className={`loader js-loader ${className}`} role="status" aria-live="polite">
      <table>
        <tbody>
          <tr>
            <td>
              <div className="bar" aria-label="Loading..."></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BlueChalkLoader;
