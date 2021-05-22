import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.home}>
      <h2>
        <p>This is my awesome secret website</p>
      </h2>
      <div>
        You will see very secret website if you go to{' '}
        <Link href="/guides">
          <span style={{ color: 'red', textDecoration: 'underline', cursor: 'pointer' }}>
            this page
          </span>
        </Link>
      </div>
    </div>
  );
}
