import { Link, useNavigate } from "react-router-dom";
import styles from "./GroupList.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { faDrumstickBite } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";
import { useGroups } from "../Contexts/GroupContext";
import { memo } from "react";
import Loading from "./Loading";
import cover from "../assets/cover.webp";
import Button from "./Button";

const GroupItem = memo(function GroupItem({ group }) {
  const memberCount = group.members?.length || 0;

  return (
    <Link
      to={`/groupPage/${group.groupID}`}
      className={styles.groupItem}
    >
      <div className={styles.groupHeader}>
        <div className={styles.groupIcon}>
          {group.name.charAt(0).toUpperCase()}
        </div>
        <div className={styles.groupDetails}>
          <div className={styles.nameContainer}>
            <h3>{group.name}</h3>
            <span className={styles.viewGroup}>View details <FontAwesomeIcon icon={faArrowRight} /></span>
          </div>

          <p className={styles.groupMeta}>
            {memberCount > 0 && <span><FontAwesomeIcon icon={faPeopleGroup} /> {memberCount} {memberCount === 1 ? 'member' : 'members'}</span>}
            {memberCount > 0 && <span className={styles.separator}>•</span>}
            <span>{group.createDt}</span>
          </p>
        </div>
      </div>
    </Link>
  );
});

const EmptyState = memo(function EmptyState() {
  const navigate = useNavigate();

  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyStateContent}>
        <div>
          <h3 className={styles.title}>Your Groups</h3>
          <p className={styles.subtitle}>Manage and track all your shared expenses</p>
        </div>
        <div className={styles.emptyStateFeatures}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}><FontAwesomeIcon icon={faSackDollar} /></span>
            <span>Split bills easily</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}><FontAwesomeIcon icon={faMoneyBillTransfer} /></span>
            <span>Track expenses</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}><FontAwesomeIcon icon={faDrumstickBite} /></span>
            <span>Settle up fairly</span>
          </div>
        </div>
      </div>
      <button
        className={styles.createGroupButton}
        onClick={() => navigate('/newGroup')}
      >
        <span className={styles.buttonIcon}>+</span>
        Create Your First Group
      </button>
    </div>
  );
});

const HeroSection = memo(function HeroSection() {
  return (
    <div>
      <div className="hero">
        <h1>
          Simplify the calculation
          <br />
          of splitting group expenses
          <br />
        </h1>
        <p>
          Ever get confused about who owes whom how much money when you're
          traveling with friends and dealing with expenses like rental cars and
          tolls? Spliito is a free service that simplifies the hassle of
          splitting bills on trips.
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link to="/newGroup" className="link-cta">
            <Button>Get Started</Button>
          </Link>
        </div>
        <img src={cover} alt="cover" loading="lazy"></img>
        <EmptyState />
      </div>
    </div>
  );
});

export default function GroupList() {
  const { groups, loading } = useGroups();
  const navigate = useNavigate();

  if (loading) {
    return <Loading message="Loading groups..." />;
  }

  if (!groups || groups.length === 0) {
    return <HeroSection />;
  }

  return (
    <div className={styles.groupListContainer}>
      <div className={styles.groupListHeader}>
        <div>
          <h3 className={styles.title}>Your Groups</h3>
          <p className={styles.subtitle}>Manage and track all your shared expenses</p>
        </div>
        <button
          className={styles.newGroupButton}
          onClick={() => navigate('/newGroup')}
        >
          <span className={styles.buttonIcon}><FontAwesomeIcon icon={faPlus} /> </span>
          New Group
        </button>
      </div>
      <div className={styles.groupList}>
        {groups.map((group) => (
          <GroupItem key={group.groupID} group={group} />
        ))}
      </div>
    </div>
  );
}
