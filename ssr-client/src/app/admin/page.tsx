import FormAuthorization from "./page-layout";
import styles from "./style.module.css";
export default function Page() {
  return (
    <>
      <div className={styles.page}>
        <FormAuthorization />
      </div>
    </>
  );
}
