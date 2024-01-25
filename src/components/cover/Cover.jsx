import noTasks from "./../../content/Cover/noTasks.png";

import "./Cover.css";

function Cover() {
  return (
    <div className="cover">
      <div className="cover__row">
        <div className="cover__row_image">
          <img src={noTasks} alt="no tasks" />
        </div>
        <div className="cover__row_text">
          <p>Let's to do something incredible</p>
        </div>
      </div>
    </div>
  );
}

export default Cover;
