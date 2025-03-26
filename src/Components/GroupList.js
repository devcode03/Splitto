import { Link } from "react-router-dom";
import styles from "./GroupList.module.css";
export default function GroupList({ groups = [] }) {
  return (
    <div style={{ padding: "1.75rem" }}>
      <h2 className={styles.title}>Recent Groups</h2>
      <div className={styles.groupList}>
        {groups.map((group) => (
          <Link
            key={group.groupID}
            to={`/groupPage/${group.groupID}`}
            className={styles.groupItem}
          >
            <div className={styles.groupDetails}>
              <h3>{group.name}</h3>
              <p>Created on {group.createDt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
